$(document).ready(function () {
    $('#tableData').DataTable({
        "paging": false,
        "language": {
            "info": "_TOTAL_ items",
        },
        "columnDefs": [
            { "targets": 0, "orderable": false },
            { "targets": 4, "orderable": false },
            { "orderSequence": ["desc", "asc"], "targets": [1] }
        ],
        order: [[1, "asc"]]
    });

    // Function to trigger the download as ZIP
    function downloadAsZip() {
        // Get the current directory from the page title
        var currentDirectory = document.title.replace("digiup - ", "");

        // Build the download URL with the current directory as the path
        var downloadUrl = `/download?path=${encodeURIComponent(currentDirectory)}`;

        // Create an invisible iframe to initiate the download
        var downloadFrame = document.createElement('iframe');
        downloadFrame.src = downloadUrl;
        downloadFrame.style.display = 'none';
        document.body.appendChild(downloadFrame);
    }

    // Attach the downloadAsZip function to the "Download as ZIP" button click event
    $('#download-zip-button').click(function (e) {
        e.preventDefault(); // Prevent the default behavior of navigating to the link
        downloadAsZip();
    });

    var inputs = document.querySelectorAll('.uploadFile');

    Array.prototype.forEach.call(inputs, function (input) {
        var label = input.nextElementSibling,
            labelVal = label.innerHTML;

        input.addEventListener('change', function (e) {
            var fileName = '';
            if (this.files && this.files.length > 1)
                fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
            else {
                fileName = e.target.value.split("\\").pop();
            }

            if (fileName)
                label.querySelector('span').innerHTML = fileName;
            else
                label.innerHTML = labelVal;
        });
    });
});
