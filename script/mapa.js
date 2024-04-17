function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -23.644957, lng: -46.562279 },
        zoom: 12
    });

    // Função para adicionar marcador com base no status do pet
    function addMarker(location, title, icon) {
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: icon,
            title: title
        });
        marker.addListener('click', function() {
            var infowindow = new google.maps.InfoWindow({
                content: title
            });
            infowindow.open(map, marker);
        });
    }

    // Função para obter os dados do formulário e adicionar marcador no mapa
    function addMarkerFromForm() {
        var petName = document.getElementById('nomePet').value;
        var petState = document.getElementById('estadoPet').value;
        var enderecoUltimaVez = document.getElementById('enderecoUltimaVez').value;

        // Verifica o status do pet e define o ícone do marcador
        var icon;
        switch (petState) {
            case 'achado':
                icon = 'imagens/patinha verde.png';
                break;
            case 'perdido':
                icon = 'imagens/patinha vermelha.png';
                break;
            case 'encontrado':
                icon = 'imagens/patinha azul.png';
                break;
            default:
                icon = '';
        }

        // Executa a geocodificação do endereço fornecido
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': enderecoUltimaVez }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var location = results[0].geometry.location;
                addMarker(location, petName, icon); // Adiciona o marcador no mapa
            } else {
                alert('Não foi possível encontrar a localização: ' + status);
            }
        });
    }

    // Adiciona evento de envio de formulário
    document.getElementById('petForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Evita o envio padrão do formulário
        addMarkerFromForm(); // Adiciona marcador ao mapa com base nos dados do formulário
    });
}
