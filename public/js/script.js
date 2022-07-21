$(() => {
    $.ajax({
        url: '/api/logs/today',
        type: 'GET',
        success: (res) => {
            $('#lookup-count').text(res.data.count);
        }
    });

    $('#copyright').text(new Date().getFullYear());
})