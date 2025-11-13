// Simple utilities shared across pages

// Calm page: breathing session
function startCalmSession(){
  const circle = document.querySelector('.breath-circle');
  const status = document.getElementById('breathStatus');
  const t = document.getElementById('timer');
  const affirm = document.getElementById('affirm');
  const affirmations = [
    "Você merece gentileza e descanso.",
    "Respire: não é preciso resolver tudo hoje.",
    "Seu corpo sabe como voltar à calma.",
    "Você é importante, mesmo nos dias difíceis.",
    "Aqui e agora, você está seguro."
  ];
  let seconds = 60;
  if(!circle || !status || !t) return;
  affirm.textContent = affirmations[Math.floor(Math.random()*affirmations.length)];
  status.textContent = "Inspire...";
  circle.classList.add('expand');
  let phase = 0; // 0=inspira,1=expira
  const swap = ()=>{
    phase = 1 - phase;
    if(phase===0){ status.textContent = "Inspire..."; circle.classList.add('expand'); }
    else { status.textContent = "Expire..."; circle.classList.remove('expand'); }
  };
  const phaseTimer = setInterval(swap, 3000); // troca a cada 3s
  const countdown = setInterval(()=>{
    seconds--;
    t.textContent = seconds + "s";
    if(seconds<=0){
      clearInterval(phaseTimer); clearInterval(countdown);
      status.textContent = "Pronto. Como se sente agora?";
    }
  },1000);
}

// Diary: evaporate text
function evaporateDiary(){
  const box = document.getElementById('diaryBox');
  const holder = document.getElementById('diaryHolder');
  if(!box || !holder) return;
  const text = box.value.trim();
  if(!text){ alert("Escreva algo que deseja soltar 💛"); return; }
  const ghost = document.createElement('div');
  ghost.textContent = text;
  ghost.className = 'textbox fade-out';
  holder.appendChild(ghost);
  box.value = "";
  setTimeout(()=>{ ghost.remove(); }, 1800);
}

// Test: calculate score
function calcStress(){
  const values = Array.from(document.querySelectorAll('.q input:checked')).map(r=>parseInt(r.value));
  if(values.length<5){ alert("Responda as 5 perguntas para ver seu resultado."); return; }
  const sum = values.reduce((a,b)=>a+b,0);
  const avg = sum/values.length;
  const result = document.getElementById('testResult');
  let level = "", tip = "";
  if(avg < 2){ level="leve"; tip="Mantenha micro-pausas e respiração 2x ao dia."; }
  else if(avg < 3.5){ level="moderado"; tip="Inclua pausas de 5 min após tarefas intensas e caminhadas curtas."; }
  else { level="alto"; tip="Use a página 'Preciso de calma' 2x hoje e, se possível, converse com alguém de confiança."; }
  result.innerHTML = "<strong>Nível "+level+"</strong><br>"+
                     "Pontuação média: "+avg.toFixed(1)+"<br>"+
                     "Sugestão: "+tip;
  result.scrollIntoView({behavior:'smooth', block:'center'});
}
