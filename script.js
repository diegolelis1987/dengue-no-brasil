document.addEventListener("DOMContentLoaded", function() {
    // Configuração do gráfico
    var ctx = document.getElementById('dengueChart').getContext('2d');
    var dengueChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['1', '5', '10', '15', '17', '19', '21'],
            datasets: [{
                label: 'Dengue no Brasil - SEMANA EPIDEMIOLÓGICA',
                data: [52.903, 173.904, 368.580, 315.957, 192.684, 249.241, 67.689],
                backgroundColor: 'rgba(255, 88, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Evento de submit do formulário de upload de imagem
    document.getElementById("imageUploadForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Evita o envio do formulário padrão

        let formData = new FormData(this);
        fetch('upl.php', {
            method: 'POST',
            body: formData
        }).then(response => response.json())
          .then(data => {
              if (data.success) {
                  document.getElementById("successMessage").style.display = "block";
                  document.getElementById("resultMessage").style.display = "block";
                  document.getElementById("analyzedImage").src = data.imageUrl;
                  document.getElementById("classResult").innerText = `Esta imagem foi classificada como: ${data.className}`;
              }
          }).catch(error => console.error('Error:', error));
    });

    // Evento de clique no botão sair
    document.getElementById("exitButton").addEventListener("click", function(event) {
        event.preventDefault(); // Evita o comportamento padrão do link
        window.location.href = "index.html"; // Redireciona para a página index.html
    });
});

