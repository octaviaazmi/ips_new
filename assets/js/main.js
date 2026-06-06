// Navbar scroll
window.addEventListener('scroll',()=>document.getElementById('navbar').classList.toggle('scrolled',scrollY>20));

// Mobile menu
function toggleMenu(){const m=document.getElementById('mobileMenu'),h=document.getElementById('hamburger');m.classList.toggle('open');h.classList.toggle('open');}
function closeMenu(){document.getElementById('mobileMenu').classList.remove('open');document.getElementById('hamburger').classList.remove('open');}

// FAQ
function toggleFaq(itemId,ansId){
  const item=document.getElementById(itemId),ans=document.getElementById(ansId);
  const wasOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(el=>el.classList.remove('open'));
  document.querySelectorAll('.faq-ans').forEach(el=>el.classList.remove('open'));
  if(!wasOpen){item.classList.add('open');ans.classList.add('open');}
}

// Form → WA
function submitWA(e){
  e.preventDefault();
  const n=(document.getElementById('f-nama').value||'').trim();
  const p=(document.getElementById('f-hp').value||'').trim();
  const d=document.getElementById('f-dana').value;
  if(!n||!p||!d){alert('Mohon lengkapi semua isian.');return;}
  const s=x=>x.replace(/[<>'"]/g,'');
  const msg=`Halo INDO PALM SOLUSI, saya ingin konsultasi estimasi pinjaman.\n\n📋 *DATA KONSULTASI*\n👤 Nama    : ${s(n)}\n📱 No. WA  : ${s(p)}\n💰 Dana    : ${d}\n\nMohon bantu kalkulasikan estimasi dana. Terima kasih.`;
  window.open('https://wa.me/6281110051022?text='+encodeURIComponent(msg),'_blank');
}

// Scroll reveal
const ro=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('up');}),{threshold:0.08,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

// ── Process Timeline Animation ──
(function(){
  const steps = [
    { pct: 10,  label: 'Mulai konsultasi via WhatsApp…' },
    { pct: 40,  label: 'Dokumen dikirim, sedang dianalisis…' },
    { pct: 72,  label: 'Dicocokkan ke mitra pembiayaan…' },
    { pct: 100, label: '🎉 Dana siap dicairkan!' },
  ];
  let current = 0;
  const INTERVAL = 2600;

  function activate(idx) {
    document.querySelectorAll('.ptl-step-ic').forEach((ic, i) => {
      ic.classList.remove('active','done');
      if(i < idx) ic.classList.add('done');
      if(i === idx) ic.classList.add('active');
    });
    document.querySelectorAll('.ptl-step-line').forEach((ln, i) => {
      ln.classList.toggle('filled', i < idx);
    });
    document.querySelectorAll('.ptl-step-day').forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
    const bar = document.getElementById('ptlProgress');
    const lbl = document.getElementById('ptlLabel');
    if(bar) bar.style.width = steps[idx].pct + '%';
    if(lbl) lbl.textContent = steps[idx].label;
  }

  function tick() {
    activate(current);
    current = (current + 1) % steps.length;
  }

  tick();
  setInterval(tick, INTERVAL);
})();

// Responsive grid fix
function fixGrids(){
  const w=window.innerWidth;
  document.querySelectorAll('.feat-grid').forEach(g=>g.style.gridTemplateColumns=w<=768?'1fr':w<=1024?'1fr 1fr':'repeat(3,1fr)');
  document.querySelectorAll('.form-layout').forEach(g=>g.style.gridTemplateColumns=w>1024?'1fr 1fr':'1fr');
  document.querySelectorAll('.about-layout').forEach(g=>g.style.gridTemplateColumns=w>1024?'5fr 7fr':'1fr');
  document.querySelectorAll('.faq-layout').forEach(g=>g.style.gridTemplateColumns=w>1024?'4fr 8fr':'1fr');
  document.querySelectorAll('.check-layout').forEach(g=>g.style.gridTemplateColumns=w>1024?'1fr 1.4fr':'1fr');
}
fixGrids();window.addEventListener('resize',fixGrids);