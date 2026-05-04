#target photoshop

(function () {
  app.displayDialogs = DialogModes.NO;

  var srcPath = "C:/Users/Liam/OneDrive/Desktop/photoshop/ThereAreNoMapsFinal.psd";
  var dstPath =
    "C:/Users/Liam/OneDrive/Desktop/woods26port/public/images/PDF_0002.png";

  var srcFile = new File(srcPath);
  if (!srcFile.exists) {
    throw new Error("PSD not found: " + srcPath);
  }

  var doc = app.open(srcFile);
  try {
    try {
      doc.flatten();
    } catch (e) {}

    var dstFile = new File(dstPath);
    var opts = new PNGSaveOptions();
    opts.compression = 6;
    opts.interlaced = false;

    doc.saveAs(dstFile, opts, true, Extension.LOWERCASE);
  } finally {
    doc.close(SaveOptions.DONOTSAVECHANGES);
  }
})();
