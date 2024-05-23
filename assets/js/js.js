document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("submitBtn").addEventListener("click", function(event) {
        event.preventDefault();
        const formData = new FormData(document.getElementById("discordForm"));

        // Validar se algum campo está vazio
        if (!formData.get("name") || !formData.get("email") || !formData.get("subject") || !formData.get("comment")) {
            alert("Por favor, preencha todos os campos do formulário.");
            return; // Encerrar a função se algum campo estiver vazio
        }

        const params = {
            name: formData.get("name"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            comment: formData.get("comment")
        };

        fetch('https://discordapp.com/api/webhooks/1242927556626485258/jKxlvnb6UXzQ7sSKhFf_CypfnuhX3J7qBx55kXkfK1KRlxiKwOJgQzg4Smg_Ksppq9Bf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: `Novo envio do formulário:\n\nNome: ${params.name}\nEmail: ${params.email}\nTema: ${params.subject}\nMensagem: ${params.comment}\n`
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao enviar mensagem para o Discord');
                }
                alert('Mensagem enviada com sucesso!');
                document.getElementById("discordForm").reset(); // Limpar o formulário após o envio
            })
            .catch(error => {
                console.error('Erro ao enviar mensagem:', error);
                alert('Erro ao enviar mensagem para o Discord. Por favor, tente novamente mais tarde.');
            });
    });
});
