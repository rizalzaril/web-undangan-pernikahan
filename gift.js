function copyAccountNumber() {
  const accountNumber = document.querySelector(".bank-number").innerText;
  navigator.clipboard
    .writeText(accountNumber)
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "Tersalin!",
        text: "Nomor rekening sudah tercopy",
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .catch((err) => {
      console.error("Gagal menyalin teks: ", err);
    });
}
