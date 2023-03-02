const currentHours = document.querySelectorAll('.current-hours');
const previousHours = document.querySelectorAll('.previous-hours');
const timeframeBtn = document.querySelectorAll('.timeframe-btn');


fetch('./data.json')
.then(response => {
    return response.json();
}).then(data => {

    timeframeBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log(btn.classList);
            timeframeBtn.forEach(activeBtn => {
                activeBtn.classList.remove('active')
            })

            btn.classList.add('active');
            
            if (btn.classList.contains("monthly")) {
                loadTimeframe('monthly');
            } else if(btn.classList.contains('weekly')){
                loadTimeframe("weekly");
            } else if(btn.classList.contains('daily')){
                loadTimeframe('daily');
            }
        })
    })

    const loadTimeframe = activeBtn => {
            
        for (let i = 0; i < data.length; i++){
            const currentView = data[i].timeframes[activeBtn];
            let currentViewCurrent = currentView.current;
            
            if (currentViewCurrent > 1) {
                currentHours[i].textContent = currentViewCurrent + 'hrs';
            }else if(currentViewCurrent === 1){
                currentHours[i].textContent = currentViewCurrent + 'hr';
            }else{
                currentHours[i].textContent = currentViewCurrent;
            }
            

            let currentViewPrevious =  currentView.previous;
            if (activeBtn === 'monthly') {
                if (currentViewPrevious > 1) {
                    previousHours[i].textContent = 'Last Month - ' + currentViewPrevious +'hrs';
                }else if(currentViewPrevious === 1){
                    previousHours[i].textContent = 'Last Month - ' + currentViewPrevious +'hr';
                }else{
                    previousHours[i].textContent = 'Last Month - ' + currentViewPrevious;
                }
            }else if(activeBtn === 'weekly'){
                if (currentViewPrevious > 1) {
                    previousHours[i].textContent = 'Last week - ' + currentViewPrevious +'hrs';
                }else  if (currentViewPrevious === 1) {
                    previousHours[i].textContent = 'Last week - ' + currentViewPrevious +'hr';
                }else{
                    previousHours[i].textContent = 'Last week - ' + currentViewPrevious;
                }
            }else{
                if (currentViewPrevious > 1) {
                    previousHours[i].textContent = 'Yesterday - ' + currentViewPrevious +'hrs';
                }else if (currentViewPrevious === 1) {
                    previousHours[i].textContent = 'Yesterday - ' + currentViewPrevious +'hr';
                }else{
                    previousHours[i].textContent = 'Yesterday - ' + currentViewPrevious;
                }
            }
        }
    }

})
