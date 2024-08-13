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

    $("#addUser").click(function() {
        selectedRow = null;
        $("#name").val('');
        $("#surname").val('');
        $("#mail").val('');
        $("#dialog-form").dialog("open");
    });

    $("deleteUser").click(function() {
        if(selectedRow) {
            dataTable.row(selectedRow).remove();
        }
    })

    $('#userTable tbody').on('dblclick', 'tr', function() {
        selectedRow = dataTable.row(this).data();
        $("#name").val(selectedRow.name);
        $("#surname").val(selectedRow.surname);
        $("#mail").val(selectedRow.mail);
        $("#dialog-form").dialog("open");
    });

    $("#dialog-form").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "შენახვა": function() {
                if (selectedRow) {
                    selectedRow.name = $("#name").val();
                    selectedRow.surname = $("#surname").val();
                    selectedRow.mail = $("#mail").val();
                    dataTable.row(selectedRow).data(selectedRow).draw();
                } else {
                    let newUser = {
                        id: dataTable.rows().count() + 1,
                        name: $("#name").val(),
                        surname: $("#surname").val(),
                        mail: $("#mail").val()
                    };
                    dataTable.row.add(newUser).draw();
                }
                $(this).dialog("close");
            },
            "წაშლა": function() {
                if (selectedRow) {
                    dataTable.row(selectedRow).remove().draw();
                }
                $(this).dialog("close");
            }
        }
    });
});

