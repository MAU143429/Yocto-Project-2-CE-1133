SUMMARY = "GPIO Control Library For Embedded Linux"
DESCRIPTION = "libgpio is a simple C library designed to control GPIO pins on embedded Linux systems"

SECTION = "libs"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://LICENSE;md5=d4771f17c9d246639529d0081eb4cadb"

SRC_URI = "file://libgpio-1.0.tar.gz"
S = "${WORKDIR}/libgpio-1.0"

inherit autotools lib_package

EXTRA_OECONF += " --enable-shared"

INSANE_SKIP:${PN} += "dev-so"

FILES:${PN} += "${libdir}/libgpio.so.*"
FILES:${PN}-dev += "${includedir}/gpio.h ${libdir}/libgpio.so"
FILES:${PN}-staticdev += "${libdir}/libgpio.a"

do_install:append() {
    install -d ${D}${libdir}

    # Copiar el archivo real de la librería
    install -m 0755 ${B}/lib/.libs/libgpio.so.0.0.0 ${D}${libdir}/

    # Moverse al directorio de destino para crear symlinks relativos
    cd ${D}${libdir}

    # Crear los enlaces simbólicos correctamente
    ln -sf libgpio.so.0.0.0 libgpio.so.0
    ln -sf libgpio.so.0 libgpio.so
}


