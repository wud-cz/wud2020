var RE_EMAIL = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

new Vue({
    el: '#registrace',
    data: {
        email: '',
        button: 'registrovat e-mail'
    },
    computed: {
        disabled: function () {
            return !RE_EMAIL.test(this.email);
        }
    },
    methods: {
        registrovat: function () {
            this.button = 'odesílá se…';
            fetch('https://api.wud.cz/wud2020/pred-registrace', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({email: this.email})
            })
                .then(response => {
                        if (response.status !== 201) {
                            console.error(response);
                            this.button = 'chyba';
                            return;
                        }
                        this.button = 'zaregistrováno';
                    }
                )
                .catch(response => {
                    this.button = 'chyba';
                    console.error(response);
                });
        }
    }
})