import store from '@/store'

store.subscribe((mutation) => {
    switch(mutation.type){
        case 'auth/SET_USER':
            if(mutation.payload){
                console.log(mutation.payload[0])
                localStorage.setItem('user', mutation.payload[0])
            }else{
                localStorage.removeItem('user')
            }
    }
})