let interaction={calendarMonth:1,calendarDay:10,calendarOffset:0,sleep:0,revenue:6,period:0,earnDay:4,contribution:287};
const earningsYear=[58200,64100,73500];
function activityValues(d){return d===10?[.816,101/120,.65]:d===7?[.65,.6,.5]:[.3+(d*17%65)/100,.25+(d*11%70)/100,.3+(d*7%60)/100]}
function activityMetrics(d){const v=activityValues(d),m=Math.round(v[1]*120);return [Math.round(v[0]*1000)+' kcal',Math.floor(m/60)+'h '+m%60+'m',(v[2]*8).toFixed(1)+' km']}
function earnLabel(period,i){return period===2?String(2024+i):period===1?String(i+1)+'月':['一','二','三','四','五','六','日'][i]}
const g=document.querySelector('#chart').getContext('2d'),V={},BLUE=V.blue||'#ef4e24',YELLOW=V.yellow||'#ffe5c5',PAPER='#f2efe9',INK='#191b1d',DEEP='#111317',B=60/120,starts=[0,2,5,8,11,14,17];
const clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>1-Math.pow(1-clamp(x),4),lerp=(a,b,p)=>a+(b-a)*p;
function text(s,x,y,size=28,color=INK,align='left',serif=false,weight=500){g.fillStyle=color;g.font=serif?`italic ${size}px Georgia`:`${weight} ${size}px SC`;g.textAlign=align;g.textBaseline='middle';g.fillText(s,x,y)}
function rr(x,y,w,h,r=18,fill){g.beginPath();g.roundRect(x,y,w,h,r);if(fill){g.fillStyle=fill;g.fill()}}
function line(x,y,x2,y2,c='#191b1d20',w=1){g.beginPath();g.moveTo(x,y);g.lineTo(x2,y2);g.strokeStyle=c;g.lineWidth=w;g.stroke()}
function dot(x,y,r,c){g.beginPath();g.arc(x,y,r,0,Math.PI*2);g.fillStyle=c;g.fill()}
function check(x,y,s=1,c=BLUE){g.save();g.translate(x,y);g.scale(s,s);g.beginPath();g.moveTo(-12,0);g.lineTo(-3,9);g.lineTo(15,-11);g.strokeStyle=c;g.lineWidth=4;g.lineCap='round';g.lineJoin='round';g.stroke();g.restore()}
function pill(s,x,y,w=140,active=false,dark=false){rr(x,y,w,42,21,active?(dark?YELLOW:BLUE):(dark?'#ffffff12':'#f2f0eb'));text(s,x+w/2,y+21,20,active?(dark?INK:'#fff'):(dark?'#d1cec8':'#85817a'),'center')}
function shell(kicker,title,tag='DEMO',dark=false){g.save();g.shadowColor='#241e1326';g.shadowBlur=44;g.shadowOffsetY=22;rr(0,0,850,660,30,dark?'#1b1e24':'#f7f7f7');g.restore();rr(0,0,850,660,30);g.strokeStyle=dark?'#8a909c44':'#191b1d12';g.lineWidth=1.5;g.stroke();text(kicker,42,44,22,dark?'#b2b5be':'#85817a');text(title,42,104,38,dark?'#f4f0e7':INK,'left',false,700);pill(tag,654,33,150,false,dark);line(42,151,808,151,dark?'#ffffff17':'#191b1d13')}
function footer(left,right='',dark=false){line(42,574,808,574,dark?'#ffffff17':'#191b1d13');text(left,42,616,22,dark?'#b8bac0':'#85817a');text(right,808,616,21,dark?YELLOW:'#737373','right')}
function cursor(){}
function tip(x,y,w,lines,dark=false){g.save();g.shadowColor='#241e1330';g.shadowBlur=22;rr(x,y,w,lines.length*31+25,13,dark?'#f5f0e7':'#1d2025');g.restore();lines.forEach((s,i)=>text(s,x+17,y+27+i*31,22,dark?INK:'#f4f0e7','left',false,i===0?700:500))}
const PALETTE={pink:'#fb64b6',lime:'#9ae600',cyan:'#00bcff',purple:'#c27aff',blue:'#3392ff',green:'#7ccf00',violet:'#7f22fe',track:'#ebebeb'};
function arc(cx,cy,r,a,b,c,w){g.beginPath();g.arc(cx,cy,r,a,b);g.strokeStyle=c;g.lineWidth=w;g.lineCap='round';g.stroke()}
function rings(cx,cy,r,values,width=5){[PALETTE.pink,PALETTE.lime,PALETTE.cyan].forEach((c,i)=>{const radius=r-i*width*1.55;arc(cx,cy,radius,0,Math.PI*2,c+'25',width);arc(cx,cy,radius,-Math.PI/2,-Math.PI/2+Math.max(.01,values[i])*Math.PI*2,c,width)})}
function calendar(u){shell('ACTIVITY / 最活跃的日期','每一天，都有记录','2026');const scroll=interaction.calendarMonth,chosen=interaction.calendarDay,selected=chosen===10,vals=activityValues(chosen);
 rr(36,176,443,382,19,'#fff');rr(496,176,317,382,19,'#fff');
 text(scroll>.5?'七月':'六月',68,204,25,INK,'left',false,700);rr(343,184,107,37,18,'#f4f4f4');text('‹    ›',396,202,24,'#737373','center');
 ['一','二','三','四','五','六','日'].forEach((s,i)=>text(s,69+i*59,249,18,'#929292','center'));
 g.save();g.beginPath();g.rect(45,270,426,269);g.clip();
 for(let month=0;month<2;month++){const offset=month===0?0:2,days=month===0?30:31,origin=month*410-scroll*410-interaction.calendarOffset;for(let d=1;d<=days;d++){const col=(d-1+offset)%7,row=Math.floor((d-1+offset)/7),x=69+col*59,y=290+row*81+origin;if(y<230||y>590)continue;if(month===scroll&&d===chosen){rr(x-25,y-18,50,72,12,'#f5f5f5');g.strokeStyle='#b6b6b6';g.lineWidth=2;g.stroke()}text(String(d),x,y,22,INK,'center');const sample=d===10?[.816,101/120,.65]:d===7?[.65,.6,.5]:[.3+(d*17%65)/100,.25+(d*11%70)/100,.3+(d*7%60)/100];rings(x,y+30,15,sample,3.4)}}g.restore();const edge=g.createLinearGradient(0,518,0,544);edge.addColorStop(0,'#ffffff00');edge.addColorStop(1,'#ffffff');g.fillStyle=edge;g.fillRect(45,518,426,26);
 text(`${scroll>.95?7:6} 月 ${chosen} 日`,518,205,24,INK,'left',false,700);text('当天活动',518,242,19,'#8b8b8b');
 rings(654,361,91,vals,15);
 const metrics=activityMetrics(chosen);['移动','锻炼','跑步'].forEach((s,i)=>{dot(526+i*96,489,5,[PALETTE.pink,PALETTE.lime,PALETTE.cyan][i]);text(s,538+i*96,489,18,'#777');text(metrics[i],550+i*96,522,21,INK,'center',false,700)});
 if(u>.95){let px=selected?305:128,py=selected?389:389;cursor(px+10,py+8,u>1.25&&u<1.43?1-(u-1.25)/.18:0)}else cursor(414,455-130*scroll);
 footer('滚动找日期 → 点选看当天','日期与详情联动')}
const sleepParts=[{name:'时长',detail:'7h 50m',value:49,max:50,color:PALETTE.purple},{name:'就寝时间',detail:'提前 20m',value:29,max:30,color:PALETTE.pink},{name:'夜间打扰',detail:'清醒 5m',value:20,max:20,color:PALETTE.blue}];
function sleepScore(u){shell('SLEEP / 睡眠评分','睡眠质量：优秀','6.29 — 7.5');const focus=interaction.sleep,active=true,p=1;let a=-Math.PI/2;const gaps=.12,span=(Math.PI*2-gaps*3)/100;
 sleepParts.forEach((part,i)=>{const end=a+part.max*span;g.globalAlpha=active&&i!==focus?.52:1;arc(425,294,105,a,end,PALETTE.track,24);arc(425,294,105,a,a+part.value*span*p,part.color,i===focus&&active?29:24);g.globalAlpha=1;a=end+gaps});text('98',425,284,72,INK,'center',false,700);text(active?sleepParts[focus].name+' '+sleepParts[focus].value+'/'+sleepParts[focus].max:'示例总分',425,331,22,'#777','center');
 sleepParts.forEach((part,i)=>{const y=426+i*46;rr(48,y,754,40,10,active&&i===focus?part.color+'25':'#fff');dot(70,y+20,6,part.color);text(part.name+'：'+part.detail,88,y+20,23,active&&i===focus?INK:'#7b7b7b');text(part.value+'/'+part.max,776,y+20,25,INK,'right',false,700)});if(active)cursor(269,444+focus*46);
 footer('悬停一行 → 聚焦对应分段','49 + 29 + 20 = 98')}
const revNow=[10,11,13,12,14,15,18,16,19,20,21,24],revOld=[8,9,10,10,11,12,15,14,15,16,18,20];
function revenue(u){const focus=interaction.revenue,active=true,p=1,current=revNow[focus]*1000,previous=revOld[focus]*1000;let total=revNow.reduce((a,b)=>a+b,0)*1000;shell('REVENUE / 营收同比',active?'¥'+current.toLocaleString('en-US'):'¥'+total.toLocaleString('en-US'),active?(focus+1)+' 月':'本年总计');
 text(active?'去年同期 ¥'+previous.toLocaleString('en-US'):'今年实线 / 去年虚线',49,190,22,'#8b8b8b');const increase=active?(current/previous-1)*100:(total/(revOld.reduce((a,b)=>a+b,0)*1000)-1)*100;rr(580,174,223,42,12,'#d8f999');text('同比 +'+increase.toFixed(0)+'%',692,195,23,'#3c6300','center');
 const x=i=>98+i*62,y=v=>504-v/30*252;[0,10,20,30].forEach(v=>{line(88,y(v),794,y(v),'#0000000d');text(v+'k',75,y(v),18,'#929292','right')});
 const cur=revNow.map((v,i)=>[x(i),y(v)]),old=revOld.map((v,i)=>[x(i),y(v)]);
 function path(pts){g.moveTo(...pts[0]);for(let i=1;i<pts.length;i++){const mid=(pts[i-1][0]+pts[i][0])/2;g.bezierCurveTo(mid,pts[i-1][1],mid,pts[i][1],...pts[i])}}
 g.save();g.beginPath();g.rect(88,231,715*p,287);g.clip();let grad=g.createLinearGradient(0,240,0,507);grad.addColorStop(0,'#9ae60040');grad.addColorStop(1,'#9ae60000');g.beginPath();path(cur);g.lineTo(x(11),504);g.lineTo(x(0),504);g.closePath();g.fillStyle=grad;g.fill();g.beginPath();path(old);g.setLineDash([8,8]);g.strokeStyle='#c7c7c7';g.lineWidth=3;g.stroke();g.setLineDash([]);g.beginPath();path(cur);g.strokeStyle=PALETTE.green;g.lineWidth=4;g.stroke();g.restore();
 for(let i=0;i<12;i++)text(String(i+1),x(i),537,19,'#929292','center');if(active){let px=x(focus);line(px,230,px,505,'#a7a7a7',1.5);dot(px,y(revNow[focus]),7,PALETTE.green);dot(px,y(revOld[focus]),5,'#a4a4a4');tip(Math.min(503,Math.max(96,px-120)),221,282,[`${focus+1} 月 · 同期比较`,`¥${current/1000}k / ¥${previous/1000}k`]);cursor(px+10,y(revNow[focus])+12)}footer('同月比同月，增幅才有意义','今年 / 去年')}
const earningsWeek=[820,1100,960,1340,1460,1680,1240],earningsMonth=[3200,7400,9800,7100,3600,2300,3700,5100,6800,4400,11800,8300];
function earnings(u){const period=interaction.period,monthly=period===1,blend=1,values=period===2?earningsYear:monthly?earningsMonth:earningsWeek,total=values.reduce((a,b)=>a+b,0),oldTotal=earningsWeek.reduce((a,b)=>a+b,0),display=total;shell('EARNINGS / 收入统计','¥'+display.toLocaleString('en-US'),'收入合计');
 rr(478,170,325,48,13,'#ededed');['周','月','年'].forEach((s,i)=>{const active=i===period;if(active)rr(483+i*106,175,103,38,10,'#fff');text(s,534+i*106,194,22,active?INK:'#858585','center')});text(period===2?'近三年 · 按年汇总':monthly?'本年 · 按月汇总':'本周 · 按日汇总',49,196,22,'#7c7c7c');
 const max=period===2?80000:monthly?12000:2000,x=i=>104+i*(690/(values.length-1)),w=monthly?33:58,base=508,progress=1;[0,.5,1].forEach(v=>text((v*max/1000)+'k',76,base-v*246,19,'#929292','right'));
 values.forEach((v,i)=>{const px=x(i),height=v/max*246*progress;rr(px-w/2,249,w,259,Math.min(16,w/2),PALETTE.track);rr(px-w/2,base-height,w,Math.max(1,height),Math.min(15,w/2),PALETTE.lime);text(earnLabel(period,i),px,539,18,'#929292','center')});
 if(true){const i=interaction.earnDay,px=x(i),y=base-values[i]/max*246;g.strokeStyle=PALETTE.green;g.lineWidth=3;rr(px-w/2-5,y-5,w+10,base-y+10,18);g.stroke();tip(Math.min(490,Math.max(94,px-130)),234,300,[earnLabel(period,i)+' · ¥'+values[i].toLocaleString('en-US'),'金额与周期一致']);cursor(px+12,y+12)}else cursor(lerp(535,641,ease((u-.55)/.45)),195,u>1&&u<1.18?1-(u-1)/.18:0);
 footer('切换周期 → 柱数与总计同步','单位：元')}
const contributionData=Array.from({length:365},(_,i)=>{const z=(i*17+Math.floor(i/9)*3)%13;return z<5?0:z<8?1:z<10?2:z<12?4:7});
const monthLengths=[31,28,31,30,31,30,31,31,30,31,30,31],monthStarts=monthLengths.map((_,m)=>monthLengths.slice(0,m).reduce((a,b)=>a+b,0));
function dayLabel(index){let m=0;while(m<11&&index>=monthStarts[m+1])m++;return `${m+1} 月 ${index-monthStarts[m]+1} 日`}
function contributions(u){const total=contributionData.reduce((a,b)=>a+b,0),activeDays=contributionData.filter(v=>v>0).length,focus=interaction.contribution,cols=['#d4d4d4','#ddd6ff','#a684ff','#8e51ff','#7f22fe'];shell('CONTRIBUTIONS / 贡献记录',total.toLocaleString('en-US')+' 次','2026 全年');
 [[activeDays+' 天','活跃天数'],['365 天','记录范围'],[Math.max(...contributionData)+' 次','单日最高']].forEach(([val,label],i)=>{rr(48+i*255,173,239,91,16,'#fff');text(val,68+i*255,203,30,INK,'left',false,700);text(label,68+i*255,238,20,'#888')});
 text('全年投入，一格一天',48,299,22,'#777');monthStarts.forEach((d,m)=>text((m+1)+'月',65+Math.floor((d+3)/7)*14,490,18,'#8c8c8c'));
 for(let c=0;c<53;c++)for(let r=0;r<7;r++){const index=c*7+r-3;if(index<0||index>=365)continue;const v=contributionData[index],level=v===0?0:v===1?1:v===2?2:v===4?3:4,p=ease((u-c*.007-r*.015)/.45);g.globalAlpha=.22+.78*p;rr(65+c*14,329+r*20,11,16,3,cols[level]);g.globalAlpha=1}
 if(u>.9){let cell=focus+3,c=Math.floor(cell/7),r=cell%7,x=65+c*14,y=329+r*20;rr(x-3,y-3,17,22,5);g.strokeStyle=PALETTE.violet;g.lineWidth=2;g.stroke();tip(Math.min(486,Math.max(54,x-100)),Math.max(263,y-96),290,[dayLabel(focus),contributionData[focus]+' 次贡献']);cursor(x+9,y+12)}
 text('少',65,535,18,'#8c8c8c');cols.forEach((c,i)=>rr(102+i*26,527,18,18,4,c));text('多',249,535,18,'#8c8c8c');text('颜色越深，次数越多',790,535,21,'#777','right');footer('点亮的是一天，也是一次投入','53 周 · 按日期读取')}
const controls=[calendar,sleepScore,revenue,earnings,contributions];

function paintChart(mode){g.clearRect(0,0,850,660);controls[mode](3)}
