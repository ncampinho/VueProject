import store from '@/store'

store.subscribe((mutation) => {
    switch(mutation.type){
        case 'auth/SET_USER':
            if(mutation.payload){
                localStorage.setItem('user', mutation.payload[0])
            }else{
                localStorage.removeItem('user')
            }
    }
})