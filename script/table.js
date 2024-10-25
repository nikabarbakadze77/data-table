export class DataTable {
    constructor(tableId, dataUrl) {
        this.tableId = tableId;
        this.dataUrl = dataUrl;
        this.selectedRow = null;
        this.dataTable = null;
    }

    initialize() {
        this.dataTable = $(this.tableId).DataTable({
            ajax: {
                url: this.dataUrl,
                dataSrc: ''
            },
            columns: [
                { data: 'id' },
                { data: 'name' },
                { data: 'surname' },
                { data: 'mail' }
            ]
        });
        this.addTableEvents();
    }

    addTableEvents() {
        const self = this;
        $(this.tableId + ' tbody').on('dblclick', 'tr', function () {
            self.selectedRow = self.dataTable.row(this).data();
            $('#name').val(self.selectedRow.name);
            $('#surname').val(self.selectedRow.surname);
            $('#mail').val(self.selectedRow.mail);
            $('#dialog-form').dialog('open');
        });
    }

    addUser(user) {
        const newUser = {
            id: this.dataTable.rows().count() + 1,
            name: user.name,
            surname: user.surname,
            mail: user.mail,
        };
        this.dataTable.row.add(newUser).draw();
    }

    deleteUser() {
        if (this.selectedRow) {
            this.dataTable.row(this.selectedRow).remove().draw();
            this.selectedRow = null;
        }
    }

    updateUser(user) {
        if (this.selectedRow) {
            this.selectedRow.name = user.name;
            this.selectedRow.surname = user.surname;
            this.selectedRow.mail = user.mail;
            this.dataTable.row(this.selectedRow).data(this.selectedRow).draw();
        }
    }
}

class User {
    constructor(id, name, surname, mail) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.mail = mail;
    }
}


$(document).ready(function () {
    const dataTable = new DataTable('#userTable', '/data/data.json');
    dataTable.initialize();

    $('#addUser').click(function () {
        const user = new User(null, $('#name').val(), $('#surname').val(), $('#mail').val());
        dataTable.addUser(user);
        $('#dialog-form').dialog('open');
    });

    $('#deleteUser').click(function () {
        dataTable.deleteUser();
    });
    
    $('#dialog-form').dialog({
        autoOpen: false,
        modal: true, 
    });
});