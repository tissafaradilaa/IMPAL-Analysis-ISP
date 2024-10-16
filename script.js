let currentStep = 'menu';
let selectedTransaction = '';
let nomorTujuan = '';
let nominalPulsa = 0; // Tambahkan variabel untuk menyimpan nominal pulsa
let autoTPList = ['08123456789', '08129876543']; // Contoh data untuk List Auto TP

// Fungsi untuk menangani tombol "Send"
function handleSend() {
    if (currentStep === 'menu') {
        let pilihan = document.getElementById('userInput').value;
        
        switch (pilihan) {
            case '1':
                selectedTransaction = 'Transfer Pulsa';
                showTransferScreen();
                break;
            case '2':
                selectedTransaction = 'Minta Pulsa';
                showMintaPulsaScreen();
                break;
            case '3':
                selectedTransaction = 'Auto TP';
                showAutoTPScreen();
                break;
            case '4':
                selectedTransaction = 'Delete Auto TP';
                showDeleteTPScreen();
                break;
            case '5':
                selectedTransaction = 'List Auto TP';
                showListTPScreen();
                break;
            case '6':
                selectedTransaction = 'Cek Kupon Undian TP';
                showKuponUndianScreen();
                break;
            default:
                alert('Pilihan tidak valid. Silakan coba lagi.');
                break;
        }
    } else if (currentStep === 'inputTransfer') {
        nomorTujuan = document.getElementById('transferInput').value;
        
        if (isValidNomor(nomorTujuan)) {
            showNominalInputScreen('Transfer Pulsa'); // Ganti tampilan untuk nominal
        } else {
            alert('Nomor tujuan tidak valid.');
        }
    } else if (currentStep === 'inputMintaPulsa') {
        nomorTujuan = document.getElementById('mintaPulsaInput').value;
        
        if (isValidNomor(nomorTujuan)) {
            showNominalInputScreen('Minta Pulsa'); // Ganti tampilan untuk nominal
        } else {
            alert('Nomor tujuan tidak valid.');
        }
    } else if (currentStep === 'inputNominal') {
        nominalPulsa = document.getElementById('nominalInput').value; // Ambil nominal pulsa
        
        if (nominalPulsa > 0) {
            showSuccessScreen();
        } else {
            alert('Nominal pulsa tidak valid.');
        }
    } else if (currentStep === 'inputAutoTP') {
        nomorTujuan = document.getElementById('autoTPInput').value;
        
        if (isValidNomor(nomorTujuan)) {
            showSuccessScreen();
        } else {
            alert('Nomor tujuan tidak valid.');
        }
    } else if (currentStep === 'inputDeleteTP') {
        nomorTujuan = document.getElementById('deleteTPInput').value;
        
        if (isValidNomor(nomorTujuan)) {
            // Menghapus nomor dari daftar Auto TP
            autoTPList = autoTPList.filter(num => num !== nomorTujuan);
            showSuccessScreen();
        } else {
            alert('Nomor tujuan tidak valid.');
        }
    }
}

// Menampilkan layar input nomor untuk Transfer Pulsa
function showTransferScreen() {
    hideAllScreens();
    document.getElementById('inputTransferScreen').classList.remove('hidden');
    currentStep = 'inputTransfer';
}

// Menampilkan layar input nomor untuk Minta Pulsa
function showMintaPulsaScreen() {
    hideAllScreens();
    document.getElementById('inputMintaPulsaScreen').classList.remove('hidden');
    currentStep = 'inputMintaPulsa';
}

// Menampilkan layar untuk input nominal pulsa
function showNominalInputScreen(transaksi) {
    hideAllScreens();
    document.getElementById('inputNominalScreen').classList.remove('hidden');
    currentStep = 'inputNominal';
}

// Menampilkan layar input nomor untuk Auto TP
function showAutoTPScreen() {
    hideAllScreens();
    document.getElementById('inputAutoTPScreen').classList.remove('hidden');
    currentStep = 'inputAutoTP';
}

// Menampilkan layar input nomor untuk Delete Auto TP
function showDeleteTPScreen() {
    hideAllScreens();
    document.getElementById('inputDeleteTPScreen').classList.remove('hidden');
    currentStep = 'inputDeleteTP';
}

// Menampilkan daftar Auto TP
function showListTPScreen() {
    hideAllScreens();
    const listElement = document.getElementById('listAutoTP');
    listElement.innerHTML = ''; // Bersihkan daftar sebelumnya
    autoTPList.forEach(num => {
        let li = document.createElement('li');
        li.textContent = num;
        listElement.appendChild(li);
    });
    document.getElementById('listAutoTPScreen').classList.remove('hidden');
    currentStep = 'listAutoTP';
}

// Menampilkan kupon undian TP
function showKuponUndianScreen() {
    hideAllScreens();
    document.getElementById('kuponUndianScreen').classList.remove('hidden');
    currentStep = 'kuponUndian';
}

// Menampilkan layar sukses
function showSuccessScreen() {
    hideAllScreens();
    let message = `${selectedTransaction} untuk nomor ${nomorTujuan}`;
    if (nominalPulsa > 0) {
        message += ` dengan nominal ${nominalPulsa}`;
    }
    document.getElementById('transactionMessage').textContent = message;
    document.getElementById('successScreen').classList.remove('hidden');
    currentStep = 'success';
}

// Fungsi untuk validasi nomor
function isValidNomor(nomor) {
    const regex = /^(08|628)\d{8,11}$/;
    return regex.test(nomor);
}

// Fungsi untuk menyembunyikan semua layar
function hideAllScreens() {
    document.querySelectorAll('.ussd-screen').forEach(screen => {
        screen.classList.add('hidden');
    });
}

// Fungsi untuk mereset form
function resetForm() {
    hideAllScreens();
    document.getElementById('menuScreen').classList.remove('hidden');
    document.getElementById('userInput').value = '';
    currentStep = 'menu';
}
