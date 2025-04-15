export default defineNuxtPlugin((nuxtApp)=>{
    if (process.client){
        const user = useUser();

        watchEffect(() => {
            if (user.value) {
                localStorage.setItem("user", JSON.stringify(user.value));
            }
        });

    }
})