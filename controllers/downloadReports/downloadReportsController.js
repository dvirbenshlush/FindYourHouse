const s3Service = require('../../services/s3Service');
const archiver = require('archiver');
const fs = require('fs');


exports.downloadReports = async (req, res) => {

    try
    {
        s3FilePath = await s3Service.getAllFilesFromS3();

        // Create a writable stream to store the zip file
        const output = fs.createWriteStream('reports.zip');

        // Create a new archiver instance
        const archive = archiver('zip', {
            zlib: { level: 9 } // Set compression level
        });

        // Pipe the output stream to the archiver
        archive.pipe(output);

        // Add the file to the archive
        archive.append(s3FilePath.dataBody, { name: s3FilePath.fileName });

        // Finalize the archive
        archive.finalize();

        // Set the response headers for downloading the zip file
        res.setHeader('Content-Disposition', 'attachment; filename=reports.zip');
        res.setHeader('Content-Type', 'application/zip');

        // Pipe the zip file to the response
        archive.pipe(res);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }

};
