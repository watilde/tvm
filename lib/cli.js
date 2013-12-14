(function () {
  'use strict';
  var argv = process.argv;
  var tvm  = require('./tvm');

  if(argv[2]) {
    switch (argv[2]) {
      case 'usage':
        if (argv.length === 3) {
          tvm.usage();
          break;
        }
      case 'list':
        if (argv.length === 3) {
          tvm.list();
          break;
        } else if (argv[3] === 'known') {
          tvm.list_known();
          break;
        }
      case 'install':
        if (argv.length === 4) {
          tvm.install(argv[3]);
          break;
        }
      case 'uninstall':
        if (argv.length === 4) {
          tvm.uninstall(argv[3]);
          break;
        }
      case 'use':
        if (argv.length === 4) {
          tvm.use(argv[3]);
          break;
        }
      case 'tsc':
        tvm.tsc(argv.slice(3).join().replace(/\,/g, ' '));
        break;
      case 'clean':
        if (argv.length === 3) {
          tvm.clean();
          break;
        }
      default:
        var message = 'Unrecognized command line argument: ';
        message += argv[2];
        message += ' ( see: \'tvm usage\' )';
        console.log(message);
        break;
    }
  } else {
    var message = '@see \'tvm usage\'\n';
    console.log(message);
  }
}());
