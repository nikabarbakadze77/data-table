export {ready};
$(document).ready(function() {
    let selectedRow;
    let dataTable = $('#userTable').DataTable({
        ajax: {
            url: 'data.json',
            dataSrc: ''
        },
        columns: [
            { data: 'id' },
            { data: 'name' },
            { data: 'surname' },
            { data: 'mail' }
        ]
    });
})