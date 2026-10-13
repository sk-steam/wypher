const icons = {
  telegram: '<path d="m21.7 3.3-3.4 17c-.3 1.2-1 1.5-2 .9l-5.2-3.8-2.5 2.4c-.3.3-.5.5-1 .5l.4-5.3L17.7 6c.4-.4-.1-.6-.6-.3L5.1 13.2 0 11.6c-1.1-.3-1.1-1.1.2-1.6L20 2.4c.9-.3 1.8.2 1.7.9Z"/>',
  discord: '<path d="M19.7 5.2A18 18 0 0 0 15.4 4l-.5 1a16 16 0 0 0-5.8 0l-.5-1a18 18 0 0 0-4.3 1.2C1.6 9.2.9 13.1 1.3 17a17 17 0 0 0 5.2 2.6l1.1-1.8-1.6-.7.4-.3a12 12 0 0 0 11.2 0l.4.3-1.6.7 1.1 1.8a17 17 0 0 0 5.2-2.6c.5-4.5-.8-8.4-3-11.8ZM8.3 14.7c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm7.4 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z"/>',
  steam: '<path d="M12 1a11 11 0 0 0-11 10l5.9 2.5a3.1 3.1 0 0 1 1.8-.6l2.7-3.9v-.1a4.4 4.4 0 1 1 4.4 4.4h-.1L12 16a3.2 3.2 0 0 1-6.3.9L1.4 15A11 11 0 1 0 12 1Zm-3.3 14 1.4.6a1.9 1.9 0 1 1-2.4 2.8l1.3.5a1.3 1.3 0 0 0 1-2.4l-1.6-.7.3-.8Zm7.1-8.8a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm0 .8a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8Z"/>',
  tiktok: '<path d="M16.6 2c.4 2.5 1.8 4 4.4 4.2v3.4a9 9 0 0 1-4.4-1.3v7a6.1 6.1 0 1 1-5.3-6.1v3.5a2.7 2.7 0 1 0 1.8 2.6V2Z"/>',
  link: '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="m9 15 6-6m-7 4-2 2a4 4 0 0 0 6 6l3-3m-6-7 3-3a4 4 0 0 1 6 6l-2 2"/>'
};
const defaults = {name:'your name',nickname:'your_nickname',eyebrow:'welcome to my little world',bio:'A little shy, a little silly.\nJust making my own cozy corner of the internet.',tags:['fluffy vibes','late-night games','soft things'],links:[{platform:'telegram',label:'Telegram',description:'come say hello',url:''},{platform:'discord',label:'Discord',description:"let's hang out",url:''},{platform:'steam',label:'Steam',description:'one more game?',url:''},{platform:'tiktok',label:'TikTok',description:'little bits of me',url:''}]};
function safeURL(value) {try {const url=new URL(value);return ['https:','http:'].includes(url.protocol)?url.href:null;}catch{return null;}}
function assetURL(value) {if(typeof value!=='string'||!value.trim())return null;try{const url=new URL(value,location.href);return ['https:','http:'].includes(url.protocol)?url.href:null;}catch{return null;}}
function renderProfile(data) {
  const profile={...defaults,...data};
  document.getElementById('profile-name').textContent=profile.name;
  document.getElementById('profile-handle').textContent=`@${String(profile.nickname).replace(/^@/,'')} ♡`;
  document.getElementById('profile-bio').textContent=profile.bio;
  document.getElementById('eyebrow').textContent=profile.eyebrow;
  document.title=`${profile.name} · a little corner`;
  document.querySelector('meta[name="description"]').content=String(profile.bio).replace(/\n/g,' ');
  const avatar=assetURL(profile.avatar);if(avatar)document.getElementById('avatar').src=avatar;
  document.querySelector('.avatar-crop').classList.toggle('character-avatar', !profile.avatar || profile.avatar==='assets/character.png');
  const background=assetURL(profile.background);if(background)document.querySelector('.wallpaper').style.backgroundImage=`url(${JSON.stringify(background)})`;
  const tags=document.getElementById('profile-tags');tags.replaceChildren();
  (Array.isArray(profile.tags)?profile.tags:[]).forEach(tag=>{const el=document.createElement('span');el.textContent=tag;tags.append(el);});
  const links=document.getElementById('social-links');links.replaceChildren();
  (Array.isArray(profile.links)?profile.links:[]).forEach(link=>{
    if(!link||link.hidden)return;
    const url=safeURL(link.url),el=document.createElement(url?'a':'div');
    el.className='social-link';el.dataset.platform=link.platform;
    if(url){el.href=url;el.target='_blank';el.rel='noopener noreferrer';el.setAttribute('aria-label',`${link.label||link.platform} (opens in a new tab)`);}else{el.setAttribute('aria-disabled','true');el.title='This link has not been added yet';}
    const icon=document.createElement('span');icon.className='social-icon';icon.setAttribute('aria-hidden','true');icon.innerHTML=`<svg viewBox="0 0 24 24">${icons[link.platform]||icons.link}</svg>`;
    const copy=document.createElement('span');copy.className='social-text';const title=document.createElement('strong');title.textContent=link.label||link.platform;const desc=document.createElement('small');desc.textContent=url?(link.description||'come say hello'):'link coming soon';copy.append(title,desc);
    const arrow=document.createElement('span');arrow.className='social-arrow';arrow.textContent=url?'↗':'♡';arrow.setAttribute('aria-hidden','true');el.append(icon,copy,arrow);links.append(el);
  });
}
renderProfile(defaults);
fetch('./profile.json',{cache:'no-cache'}).then(response=>{if(!response.ok)throw new Error('Profile unavailable');return response.json();}).then(data=>{if(!data||typeof data!=='object'||Array.isArray(data))throw new Error('Invalid profile');renderProfile(data);}).catch(()=>{const note=document.getElementById('config-notice');note.hidden=false;note.textContent='The profile settings could not be loaded. Please try again later.';});
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
let paused=reducedMotion.matches;
const motionButton=document.querySelector('.motion-toggle');
function setMotion(){document.body.classList.toggle('motion-paused',paused);motionButton.setAttribute('aria-pressed',String(paused));motionButton.title=paused?'Enable animations':'Pause animations';document.getElementById('motion-label').textContent=paused?'quiet mode':'slow & cozy';}
setMotion();motionButton.addEventListener('click',()=>{paused=!paused;setMotion();});reducedMotion.addEventListener('change',event=>{paused=event.matches;setMotion();});
window.addEventListener('pointermove',event=>{if(paused||reducedMotion.matches||event.pointerType!=='mouse')return;document.documentElement.style.setProperty('--pointer-x',`${(event.clientX/innerWidth-.5)*-8}px`);document.documentElement.style.setProperty('--pointer-y',`${(event.clientY/innerHeight-.5)*-8}px`);},{passive:true});
document.getElementById('love-button').addEventListener('click',()=>{
  document.getElementById('love-icon').textContent='♥';document.getElementById('love-label').textContent='love sent!';document.getElementById('love-button').setAttribute('aria-label','Love sent');
  if(paused||reducedMotion.matches)return;
  const burst=document.getElementById('love-burst');burst.replaceChildren();
  for(let i=0;i<6;i++){const heart=document.createElement('span');heart.className='burst-heart';heart.textContent='♡';heart.style.setProperty('--drift',`${(i-2.5)*22}px`);heart.style.animationDelay=`${i*.06}s`;burst.append(heart);heart.addEventListener('animationend',()=>heart.remove(),{once:true});}
});
