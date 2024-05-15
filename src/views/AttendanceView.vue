<template>
    <div class="overflow-x-auto">
        <select @change="sortData" class="flex justify-between items-center mb-4">
            <option value="name_asc">Jam Terbaru</option>
            <option value="date_desc">Jam Terlama</option>
            <option value="date_desc">Masuk</option>
            <option value="date_desc">Keluar</option>
        </select>

        <table class="table mx-auto">
            <thead>
            <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Waktu</th>
                <th>Aksi</th>
            </tr>
            </thead>
            <tbody>
            <tr class="hover">
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>07:49</td>
                <td>Masuk</td>
            </tr>
            <tr class="hover">
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>07:54</td>
                <td>Masuk</td>
            </tr>
            <tr class="hover">
                <th>3</th>
                <td>Brice Swyre</td>
                <td>08.01</td>
                <td>Masuk</td>
            </tr>
            </tbody>
        </table>
    </div>

</template>

<script setup>
function sortData(event) {
    var selectedValue = event.target.value;
    var table = document.getElementById("data-table");
    var tbody = table.querySelector("tbody");
    var rows = Array.from(tbody.rows).slice();

    rows.sort(function(a, b) {
        var aValue, bValue;
        if (selectedValue === "name_asc" || selectedValue === "name_desc") {
            aValue = a.cells[0].textContent.trim();
            bValue = b.cells[0].textContent.trim();
        } else if (selectedValue === "date_asc" || selectedValue === "date_desc") {
            aValue = new Date(a.cells[1].textContent.trim());
            bValue = new Date(b.cells[1].textContent.trim());
        }
        return selectedValue.includes("asc") ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    });

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    rows.forEach(function(row) {
        tbody.appendChild(row);
    });
}
</script>
