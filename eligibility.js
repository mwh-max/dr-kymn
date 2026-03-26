(function () {
  'use strict';

  // 2025 Federal Poverty Level — monthly amounts (contiguous US)
  // Source: aspe.hhs.gov (published January 2025)
  var FPL_BASE = 1304; // 1-person household
  var FPL_EACH = 458;  // each additional person

  function monthlyFPL(size) {
    return FPL_BASE + FPL_EACH * (Math.max(1, size) - 1);
  }

  var answers = {
    kyResident: null,
    age: null,
    pregnant: null,
    disabled: null,
    householdSize: 1,
    monthlyIncome: null
  };

  // Ordered step IDs (matches step-{name} elements)
  var steps = ['resident', 'age', 'pregnant', 'disability', 'household', 'income'];

  function goTo(stepIndex) {
    document.querySelectorAll('.eq-step').forEach(function (el) { el.hidden = true; });
    document.getElementById('eq-result').hidden = true;
    document.getElementById('eq-progress-wrap').hidden = false;
    document.getElementById('step-' + steps[stepIndex]).hidden = false;
    updateProgress(stepIndex);
    document.getElementById('eq-form').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function updateProgress(stepIndex) {
    var pct = Math.round((stepIndex / steps.length) * 100);
    var bar = document.getElementById('eq-progress');
    bar.style.width = pct + '%';
    bar.parentElement.setAttribute('aria-valuenow', pct);
    document.getElementById('eq-progress-label').textContent =
      'Question ' + (stepIndex + 1) + ' of ' + steps.length;
  }

  function showNotKY() {
    document.querySelectorAll('.eq-step').forEach(function (el) { el.hidden = true; });
    document.getElementById('eq-result').hidden = true;
    document.getElementById('eq-progress-wrap').hidden = true;
    document.getElementById('step-not-ky').hidden = false;
  }

  function showResult() {
    document.querySelectorAll('.eq-step').forEach(function (el) { el.hidden = true; });
    document.getElementById('eq-progress-wrap').hidden = true;
    document.getElementById('eq-result').hidden = false;
    renderResult();
    document.getElementById('eq-form').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function renderResult() {
    var fpl = monthlyFPL(answers.householdSize);
    var qualified = [];

    // Adult Medicaid Expansion: age 19–64, income ≤ 138% FPL
    if (answers.age >= 19 && answers.age <= 64 && answers.monthlyIncome <= fpl * 1.38) {
      qualified.push('expansion');
    }

    // Pregnancy Medicaid: pregnant, income ≤ 195% FPL
    // Source: KFF State Health Facts, January 2025
    if (answers.pregnant && answers.monthlyIncome <= fpl * 1.95) {
      qualified.push('pregnancy');
    }

    // ABD: age 65+ or SSI/SSDI/disability, income ≤ 74% FPL
    if ((answers.age >= 65 || answers.disabled) && answers.monthlyIncome <= fpl * 0.74) {
      qualified.push('abd');
    }

    var html = '';

    if (qualified.length === 0) {
      html =
        '<p class="eq-result-intro">Based on what you entered, you may not qualify for these programs.</p>' +
        "<p>That doesn\u2019t mean there are no options \u2014 call <strong>855-459-6328</strong> or visit " +
        '<a href="apply.html">apply.html</a> to speak with someone.</p>';
    } else {
      html =
        '<p class="eq-result-intro">Based on what you entered, you may qualify for:</p>' +
        '<ul class="eq-match-list">';

      if (qualified.indexOf('expansion') !== -1) {
        html +=
          '<li><strong>Adult Medicaid Expansion</strong> \u2014 health coverage for adults age 19\u201364 ' +
          'whose income is at or below 138% of the federal poverty level.</li>';
      }
      if (qualified.indexOf('pregnancy') !== -1) {
        html +=
          '<li><strong>Pregnancy Medicaid</strong> \u2014 full coverage during pregnancy for those ' +
          'whose income is at or below 195% of the federal poverty level.</li>';
      }
      if (qualified.indexOf('abd') !== -1) {
        html +=
          '<li><strong>Aged, Blind, or Disabled (ABD) Medicaid</strong> \u2014 coverage for people ' +
          'age 65 or older, or those with a qualifying disability, whose income is at or below ' +
          '74% of the federal poverty level.</li>';
      }

      html +=
        '</ul>' +
        '<p class="eq-caveat">This is not a guarantee \u2014 apply to find out for sure. ' +
        '<a href="apply.html">How to apply \u2192</a></p>';
    }

    document.getElementById('eq-result-content').innerHTML = html;
  }

  function setActive(btn, selector) {
    document.querySelectorAll(selector).forEach(function (b) {
      b.classList.remove('eq-yn-active');
    });
    btn.classList.add('eq-yn-active');
  }

  function showFieldError(id, msg) {
    var el = document.getElementById(id);
    el.textContent = msg;
    el.hidden = false;
  }

  function clearFieldError(id) {
    var el = document.getElementById(id);
    el.textContent = '';
    el.hidden = true;
  }

  function init() {
    // Step 1 — KY resident
    document.querySelectorAll('[data-answer="resident"]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        answers.kyResident = this.dataset.value === 'yes';
        setActive(this, '[data-answer="resident"]');
        if (!answers.kyResident) {
          showNotKY();
        } else {
          goTo(1);
        }
      });
    });

    // Step 2 — Age
    document.getElementById('eq-age-next').addEventListener('click', function () {
      var val = parseInt(document.getElementById('eq-age').value, 10);
      if (isNaN(val) || val < 0 || val > 120) {
        showFieldError('eq-age-error', 'Please enter a valid age (0\u2013120).');
        return;
      }
      clearFieldError('eq-age-error');
      answers.age = val;
      goTo(2);
    });

    document.getElementById('eq-age').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') document.getElementById('eq-age-next').click();
    });

    // Step 3 — Pregnant
    document.querySelectorAll('[data-answer="pregnant"]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        answers.pregnant = this.dataset.value === 'yes';
        setActive(this, '[data-answer="pregnant"]');
        goTo(3);
      });
    });

    // Step 4 — Disability
    document.querySelectorAll('[data-answer="disabled"]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        answers.disabled = this.dataset.value === 'yes';
        setActive(this, '[data-answer="disabled"]');
        goTo(4);
      });
    });

    // Step 5 — Household size
    document.getElementById('eq-household-next').addEventListener('click', function () {
      answers.householdSize = parseInt(document.getElementById('eq-household').value, 10);
      goTo(5);
    });

    // Step 6 — Monthly income
    document.getElementById('eq-income-next').addEventListener('click', function () {
      var raw = document.getElementById('eq-income').value.trim();
      var val = parseFloat(raw);
      if (raw === '' || isNaN(val) || val < 0) {
        showFieldError('eq-income-error', 'Please enter your monthly income (enter 0 if you have none).');
        return;
      }
      clearFieldError('eq-income-error');
      answers.monthlyIncome = val;
      showResult();
    });

    document.getElementById('eq-income').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') document.getElementById('eq-income-next').click();
    });

    // Back buttons (shared handler)
    document.querySelectorAll('[data-back]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        goTo(parseInt(this.dataset.back, 10));
      });
    });

    // Restart
    document.getElementById('eq-restart').addEventListener('click', function () {
      answers = { kyResident: null, age: null, pregnant: null, disabled: null, householdSize: 1, monthlyIncome: null };
      document.querySelectorAll('.eq-yn-btn').forEach(function (b) { b.classList.remove('eq-yn-active'); });
      document.getElementById('eq-age').value = '';
      document.getElementById('eq-income').value = '';
      document.getElementById('eq-household').selectedIndex = 0;
      goTo(0);
    });

    goTo(0);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
