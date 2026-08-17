@echo off
setlocal

set "JAVA_HOME=C:\Program Files\Microsoft\jdk-21.0.12.8-hotspot"
set "MVN=C:\tools\maven-extracted\apache-maven-3.9.16\bin\mvn.cmd"
set "PATH=%JAVA_HOME%\bin;C:\tools\maven-extracted\apache-maven-3.9.16\bin;%PATH%"

echo === Avvio Backend Meteo App ===
echo JAVA_HOME: %JAVA_HOME%
"%MVN%" spring-boot:run
