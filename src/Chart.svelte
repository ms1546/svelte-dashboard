<script>
  import { onMount, onDestroy } from 'svelte';
  import Chart from 'chart.js/auto';

  export let data = []; // 初期値として空の配列を設定
  let chartInstance;
  let canvas;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((_, index) => index + 1),
        datasets: [{
          label: 'Random Data',
          data: data,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
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
  });

  $: if (chartInstance && data) {
    chartInstance.data.labels = data.map((_, index) => index + 1);
    chartInstance.data.datasets[0].data = data;
    chartInstance.update();
  }

  onDestroy(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }
  });
</script>

<canvas bind:this={canvas}></canvas>
