<script>
  import Chart from './Chart.svelte';
  let temperatureData = [];
  let humidityData = [];

  const ws = new WebSocket('ws://localhost:8080');
  ws.onmessage = function(event) {
    const message = JSON.parse(event.data);
    if (message.type === 'temperature') {
      temperatureData = [...temperatureData, message.value];
      if (temperatureData.length > 50) temperatureData.shift();
    } else {
      humidityData = [...humidityData, message.value];
      if (humidityData.length > 50) humidityData.shift();
    }
  };
</script>

<main>
  <h1>リアルタイムデータダッシュボード</h1>
  <h2>Temperature</h2>
  <Chart {temperatureData} />
  <h2>Humidity</h2>
  <Chart {humidityData} />
</main>
