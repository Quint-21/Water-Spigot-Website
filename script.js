const menuButton=document.querySelector('.menu-button');
const nav=document.querySelector('#primary-nav');
menuButton.addEventListener('click',()=>{
  const open=menuButton.getAttribute('aria-expanded')==='true';
  menuButton.setAttribute('aria-expanded',String(!open));
  menuButton.setAttribute('aria-label',open?'Open navigation':'Close navigation');
  nav.classList.toggle('open',!open);
});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded','false');
  menuButton.setAttribute('aria-label','Open navigation');
}));

const search=document.querySelector('#analyte-search');
const cards=[...document.querySelectorAll('.analyte-card')];
const count=document.querySelector('#result-count');
const noResults=document.querySelector('#no-results');
const allItems=[...document.querySelectorAll('.analyte-card li')];

function filterAnalytes(){
  const query=search.value.trim().toLowerCase();
  let visible=0;
  cards.forEach(card=>{
    const groupMatch=card.dataset.group.toLowerCase().includes(query);
    let cardVisible=0;
    card.querySelectorAll('li').forEach(item=>{
      const show=!query||groupMatch||item.textContent.toLowerCase().includes(query);
      item.hidden=!show;
      if(show) cardVisible++;
    });
    card.hidden=cardVisible===0;
    visible+=cardVisible;
  });
  count.textContent=query?`${visible} result${visible===1?'':'s'}`:`${allItems.length} analyses`;
  noResults.hidden=visible!==0;
}
search.addEventListener('input',filterAnalytes);
filterAnalytes();
