 const API_KEY = '985639053b-2cd12fb5ea-syltvu'; 
    const amountEl = document.getElementById("amount");
    const fromCurrencyEl = document.getElementById("fromCurrency");
    const toCurrencyEl = document.getElementById("toCurrency");
    const resultEl = document.getElementById("convertedAmount");
    const loaderEl = document.getElementById("loader");

    async function convertCurrency() {
      const amount = parseFloat(amountEl.value);
      const from = fromCurrencyEl.value;
      const to = toCurrencyEl.value;

      if (!amount || from === to) {
        resultEl.innerText = `${amount.toFixed(2)} ${to}`;
        return;
      }

      loaderEl.classList.add("active");

      try {
        const res = await fetch(`https://api.fastforex.io/fetch-one?from=${from}&to=${to}&api_key=${API_KEY}`);
        const data = await res.json();

        if (data.result && data.result[to]) {
          const rate = data.result[to];
          const converted = (amount * rate).toFixed(2);
          resultEl.innerText = `${converted} ${to}`;
        } else {
          resultEl.innerText = 'Conversion failed!';
        }
      } catch (error) {
        console.error(error);
        resultEl.innerText = 'Error fetching rate!';
      } finally {
        loaderEl.classList.remove("active");
      }
    }

    amountEl.addEventListener("input", convertCurrency);
    fromCurrencyEl.addEventListener("change", convertCurrency);
    toCurrencyEl.addEventListener("change", convertCurrency);

    convertCurrency();