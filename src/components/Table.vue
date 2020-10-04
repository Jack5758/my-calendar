<template>
    <div class="container">
        <div class="calendar">
            <div class="month">
                <i class="fas fa-angle-left prev" @click="showPrevMonth"></i>
                    <div class="date">
                        <h1>{{ currentYear }} <span>年</span> {{ currentMonth }} <span>月</span> </h1>
                    </div>
                <i class="fas fa-angle-right next" @click="showNextMonth"></i>
            </div>
            <div class="weekdays">
                <div
                v-for="(i, index) in calendarStore.dayOfWeek"
                :key="index"
                >
                {{ i }}
                </div>
            </div>
            
            <div class="days">
                <div class="prev-date"
                v-for="(prevDay, index) in numOfprevDay"
                :key="index"
                >
                  {{ lastDayOfprevMonth - numOfprevDay + prevDay }}

                </div>
                <div 
                v-for="(day, index) in daysInMonth"
                :key="index"
                :style="[styleCurrentDate(index)]"
                >
                {{ day }}
                </div>
                <div class="next-date"
                v-for="(i, index) in calNumOfnextDay"
                :key="index"
                >
                {{ i }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, computed, toRefs, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
    export default {
            setup(){
                const store = useStore();
                const calendarStore = computed(()=>{
                    return store.state
                });

                const calendar = reactive({
                    currentYear: '',
                    currentMonth: '',
                    daysInMonth: '',
                    lastDayOfprevMonth: '',
                    numOfprevDay: '',
                    numOfnextDay: '',
                })

                const calNumOfnextDay = computed(() => {
                    let result;
                    result = 7 - (calendar.numOfnextDay + 1)
                    if(result === 0){
                        result = 7;
                    }
                    return result;
                })

                function styleCurrentDate(index){
                    const day = index + 1
                    if(day === calendarStore.value.today && calendar.currentMonth === new Date().getMonth()+1 && calendar.currentYear === new Date().getFullYear()){
                        return {
                            backgroundColor: '#167e56'
                        }
                    }
                }

                function showPrevMonth(){
                    calendarStore.value.renderNewDate.setMonth(calendarStore.value.renderNewDate.getMonth()-1)
                    calendarStore.value.reRenderKey += 1
                }

                function showNextMonth(){
                    calendarStore.value.renderNewDate.setMonth(calendarStore.value.renderNewDate.getMonth()+1)
                    calendarStore.value.reRenderKey += 1
                }

                onBeforeMount(() => {
                    const year = calendarStore.value.renderNewDate.getFullYear();
                    const month = calendarStore.value.renderNewDate.getMonth();
                    const theLastDayOfprevMonth = new Date(year, month, 0).getDate();
                    const indexOfLastDay = new Date(year, month+1, 0).getDay();
                    let findFirstDay = calendarStore.value.renderNewDate;
                    findFirstDay.setDate(1);

                    calendar.currentYear = year;
                    calendar.currentMonth = month+1;
                    calendar.daysInMonth = new Date(year, month+1, 0).getDate();
                    calendar.lastDayOfprevMonth = theLastDayOfprevMonth;
                    calendar.numOfprevDay = findFirstDay.getDay();
                    calendar.numOfnextDay = indexOfLastDay;
                });

                return { ...toRefs(calendar), calendarStore, calNumOfnextDay, styleCurrentDate, showNextMonth, showPrevMonth };
            }
        }
</script>

<style lang="scss" scoped>

.container {
    background-color:#12121f;
    color: #eee;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.calendar {
    width: 45rem;
    height: 52rem;
    background-color: #222227;
    box-shadow: 0 .5rem 3rem rgba(0, 0, 0, 0.4);
}

.month {
    width: 100%;
    height: 12rem;
    background-color: #167e56;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    text-align: center;

    & i{
        font-size: 2.5rem;
        cursor: pointer;
    }

    & h1 {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 3rem;
        font-weight: 400;
    }

    & span {
        font-size: 2.4rem;
        margin: 0 .5rem;
    }
}

.weekdays {
    width: 100%;
    height: 5rem;
    padding: 0 .4rem;
    display: flex;
    align-items: center;

    & div{
        font-size: 1.5rem;
        font-weight: 400;
        width: calc(44.2rem/7);
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.days {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: .2rem;

    & div {
        font-size: 1.4rem;
        margin: .3rem;
        width: calc(40.4rem/7);
        height: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover:not(.today){
            background-color: #262626;
            border: .2rem solid #777;
            cursor: pointer;
            transition: background-color .2s;
        }
    }

    .prev-date, 
    .next-date {
        opacity: .5;
    }

    .today {
        background-color: #167e56;
    }
}

</style>