#include <qsinterpreter.h>
#include <QCoreApplication>
#include <QFile>
#include <QTextStream>
#include <stdio.h>

int main(int argc, char **argv) {
    QCoreApplication _app(argc, argv);
    QSInterpreter ip;
    ip.setErrorMode(QSInterpreter::Nothing);

    auto run = [&](const QString &code, const QString &name) -> bool {
        ip.evaluate(code, nullptr, name);
        if (!ip.hadError()) return true;
        const QByteArray b = ip.errorMessage().toLocal8Bit();
        if (!name.isEmpty()) fprintf(stderr, "%s: ", name.toLocal8Bit().constData());
        fprintf(stderr, "%s\n", b.constData());
        return false;
    };

    if (argc > 1) {
        for (int i = 1; i < argc; ++i) {
            const QString path = QString::fromLocal8Bit(argv[i]);
            QFile f(path);
            if (!f.open(QIODevice::ReadOnly | QIODevice::Text)) {
                fprintf(stderr, "%s: failed to open\n", argv[i]);
                return 2;
            }
            QTextStream s(&f);
            if (!run(s.readAll(), path)) return 1;
        }
        return 0;
    }

    QTextStream in(stdin);
    QTextStream out(stdout);
    QString line;
    while (true) {
        out << "qsa> " << flush;
        line = in.readLine();
        if (line.isNull()) break;
        if (line.isEmpty()) continue;
        run(line, QString());
    }
    return 0;
}
