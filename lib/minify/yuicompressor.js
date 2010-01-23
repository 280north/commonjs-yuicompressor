var OS = require("os");
var FILE = require("file");

exports.jarPath = FILE.path(module.path).dirname().dirname().dirname().join("yuicompressor-2.4.2.jar");

exports.compress = function(code, options) {
    options = options || {};
    options.charset = options.charset || "UTF-8";

    var cmd = [
        "java",
        "-jar", exports.jarPath,
        "--type", "js",
        "--charset", options.charset,
        "/dev/stdin"
    ];
    
    var p = OS.popen(cmd, { charset : options.charset });
    try {
        p.stdin.write(code).close();
        
        if (p.wait() !== 0)
            throw new Error("yuicompressor error: " + p.stderr.read());
    
        return p.stdout.read();
    } finally {
        p.stdin.close();
        p.stdout.close();
        p.stderr.close();
    }
}
