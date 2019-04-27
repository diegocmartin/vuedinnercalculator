const LOCAL_STORAGE_KEY = 'dinnerCalculator';

const app = new Vue ({
    el: '#app',
    data: {
        dinner: 100,
        tip: 9,
        people: 2,

    },
    computed:{
        totalWithTaxes(){
            return this.dinner*(1+21/100);
        },
        totalWithTip(){
            return this.totalWithTaxes+this.tip;
        },
        totalPerPerson(){
            return this.totalWithTip/this.people;
        },
        stateToLocalStorage(){
            return {
                dinner: this.dinner,
                people: this.people,
                tip: this.tip,
            };
        }
    },
    filters: {
        currency(amount){
            const CURRENCY = '€';
            return `${amount.tofixed(2)} ${CURRENCY}`;
        }
    },
/*     methods: {
        saveStateToLocal(){
            this.localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify({
                dinner: this.dinner,
                people: this.people,
                tip: this.tip,
            }));
        }
    }, */
    created(){
        //Creamos el obj en localStorage
        const {dinner, people, tip} = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
        if (dinner!== undefined) this.dinner = dinner;
        if (people!== undefined) this.people = people;
        if (tip!== undefined) this.tip = tip;
    },
/*     mounted(){
        this.dinner=localStorage.dinner ? JSON.parse(localStorage.getItem('dinner')):this.totalWithTaxes;
    }, */
    watch:{
        stateToLocalStorage(){
            localStorage.setItem(
                LOCAL_STORAGE_KEY,
                JSON.stringify(this.stateToLocalStorage),
            );
        }
    },
})