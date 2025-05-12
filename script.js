const materialInput = document.getElementById('materialCost');
const laborInput = document.getElementById('laborCost');
const overheadInput = document.getElementById('overhead');
const includeTax = document.getElementById('includeTax');

const materialResult = document.getElementById('materialResult');
const laborResult = document.getElementById('laborResult');
const overheadResult = document.getElementById('overheadResult');
const totalResult = document.getElementById('totalResult');
const ppnResult = document.getElementById('ppnResult');
const finalResult = document.getElementById('finalResult');

function formatRupiah(value) {
  return 'Rp ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function parseNumber(str) {
  return parseInt(str.replace(/[^\d]/g, '')) || 0;
}

function updateResult() {
  const material = parseNumber(materialInput.value);
  const labor = parseNumber(laborInput.value);
  const overheadPct = parseFloat(overheadInput.value) || 0;

  const overhead = Math.round((material + labor) * (overheadPct / 100));
  const total = material + labor + overhead;
  const ppn = includeTax.checked ? Math.round(total * 0.11) : 0;
  const final = total + ppn;

  materialResult.textContent = formatRupiah(material);
  laborResult.textContent = formatRupiah(labor);
  overheadResult.textContent = formatRupiah(overhead);
  totalResult.textContent = formatRupiah(total);
  ppnResult.textContent = formatRupiah(ppn);
  finalResult.textContent = formatRupiah(final);
}

function formatInput(e) {
  const val = parseNumber(e.target.value);
  e.target.value = val.toLocaleString('id-ID');
  updateResult();
}

materialInput.addEventListener('input', formatInput);
laborInput.addEventListener('input', formatInput);
overheadInput.addEventListener('input', updateResult);
includeTax.addEventListener('change', updateResult);

// Inisialisasi
updateResult();