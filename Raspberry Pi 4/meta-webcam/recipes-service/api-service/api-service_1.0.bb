SUMMARY = "Flask API service"
DESCRIPTION = "Starts Flask API on boot using sysvinit"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://API.py;md5=ea81104896856789dec546030922bdf8"

SRC_URI = "file://API.py \
           file://api-service"

S = "${WORKDIR}"

RDEPENDS:${PN} += "python3 python3-flask"

do_install() {
    install -d ${D}${bindir}
    install -m 0755 ${WORKDIR}/API.py ${D}${bindir}/API.py

    install -d ${D}${sysconfdir}/init.d
    install -m 0755 ${WORKDIR}/api-service ${D}${sysconfdir}/init.d/api-service
}

INITSCRIPT_NAME = "api-service"
INITSCRIPT_PARAMS = "defaults"
inherit update-rc.d

