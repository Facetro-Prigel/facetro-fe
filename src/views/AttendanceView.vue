<template>

    <div class="mt-20 ml-20">
        <h1 class="text-5xl font-bold">Attendance</h1>
        <ol class="breadcrumb mb-4 mt-4">
            <li class="breadcrumb-item active text-lg mb-10">Log Presensi</li>
        </ol>
    </div>

    <div class="overflow-x-auto ml-20 mr-20">
      <select @change="sortData" class="flex justify-between items-center mb-4">
        <option value="name_asc">Nama A-Z</option>
        <option value="name_desc">Nama Z-A</option>
        <option value="date_asc">Jam Terbaru</option>
        <option value="date_desc">Jam Terlama</option>
      </select>
  
      <table class="table mx-auto" id="data-table">
        <thead>
          <tr class="text-lg">
            <th>No</th>
            <th>Nama</th>
            <th>Waktu</th>
            <th>Aksi</th>
            <th>Ruangan</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover">
            <td>1</td>
            <td>Cy Ganderton</td>
            <td>07:49</td>
            <td>Masuk</td>
            <td>Digital Center - 1A</td>
          </tr>
          <tr class="hover">
            <td>2</td>
            <td>Hart Hagerty</td>
            <td>07:54</td>
            <td>Masuk</td>
            <td>Digital Center - 1A</td>
          </tr>
          <tr class="hover">
            <td>3</td>
            <td>Brice Swyre</td>
            <td>08.01</td>
            <td>Masuk</td>
            <td>Digital Center - 1A</td>
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
    var rows = Array.from(tbody.rows);
  
    rows.sort(function(a, b) {
      var aValue, bValue;
      if (selectedValue === "name_asc" || selectedValue === "name_desc") {
        aValue = a.cells[1].textContent.trim(); // Mengambil teks dari kolom Nama
        bValue = b.cells[1].textContent.trim();
      } else if (selectedValue === "date_asc" || selectedValue === "date_desc") {
        aValue = new Date(a.cells[2].textContent.trim()); // Mengambil teks dari kolom Waktu
        bValue = new Date(b.cells[2].textContent.trim());
      }
      return selectedValue.includes("asc") ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    });
  
    rows.forEach(function(row) {
      tbody.appendChild(row);
    });
  }
  </script>
  