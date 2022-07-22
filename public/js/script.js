$(() => {
    $.ajax({
        url: '/api/logs/today',
        type: 'GET',
        success: (res) => {
            const count = res.data.count || 0;
            $('#lookup-count').text(count);
        }
    });

    $('#copyright').text(`© ${new Date().getFullYear()} - Discord Lookup API`);
})