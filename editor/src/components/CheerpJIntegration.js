import React, {useState} from 'react';
import ImportScript from "../hooks/ImportScript";
import {Button} from "react-bootstrap";
import {ReactComponent} from "*.svg";

function CheerpJIntegration(props){
	const [currentId, setCurrentId] = useState(0);
	loadCheerpJ();
	return (
		<React.Fragment>
			<Button onClick={() => compileJavaCode(currentId, setCurrentId, props.code)}
					id="compileButton"> Compile </Button>
		</React.Fragment>
	);
}

function loadCheerpJ() {

	ImportScript("https://cjrtnc.leaningtech.com/2.2/loader.js", onLoad, loadCheerpJ);
}

function cheerpJReady() {
	let cb = document.getElementById("compileButton");
	cb.disabled = false;
}

function compileJavaCode(currentId, setCurrentId, code) {
	setCurrentId(currentId + 1);
	let cb = document.getElementById("compileButton");
	cb.disabled = true;
	/*let console = document.getElementById("console");
	console.textContent = "> Compiling...\r\n\r\n";*/
	let newCode = code;
	let packageName = "javafiddle" + (currentId).toString();
	newCode = "package " + packageName + ";\n" + newCode;
	cheerpjAddStringFile("/str/JavaFiddle.java", newCode);
	cheerpjRunMain("com.sun.tools.javac.Main", "/app/tools.jar:/files/", "/str/JavaFiddle.java", "-d", "/files/").then(
		function (r) {
			let cb = document.getElementById("compileButton");
			cb.disabled = false;
			// Non-zero exit code means that an error has happened
			if (r == 0) {
				console.textContent = "> Running...\r\n\r\n";
				cheerpjRunMain(packageName + ".JavaFiddle", "/app/tools.jar:/files/");
			}
		}
	);
}

function onLoad() {
	let preloadResources = ["/lts/rt.jar", "/lts/rt.jar.c0.txt", "/lts/rt.jar.c1.txt", "/lts/rt.jar.c96.txt", "/lts/rt.jar.c95.txt", "/lts/rt.jar.c81.txt", "/lts/rt.jar.c82.txt", "/lts/rt.jar.c83.txt", "/lts/rt.jar.c84.txt", "/lts/rt.jar.c85.txt", "/lts/rt.jar.c86.txt", "/lts/rt.jar.c87.txt", "/lts/rt.jar.c88.txt", "/lts/rt.jar.c89.txt", "/lts/rt.jar.c90.txt", "/lts/rt.jar.c91.txt", "/lts/rt.jar.c92.txt", "/lts/rt.jar.c93.txt", "/lts/rt.jar.c94.txt", "/lts/rt.jar.c80.txt", "/lt/runtime/rt.jar.sun.reflect.js", "/lt/runtime/rt.jar.java.lang.js", "/lt/cheerpj/Arial.ttf", "/lt/runtime/rt.jar.java.nio.js", "/lt/runtime/rt.jar.sun.nio.js", "/lts/rt.jar.c10.txt", "/lts/rt.jar.c11.txt", "/lts/rt.jar.c9.txt", "/lt/runtime/rt.jar.java.nio.file.js", "/lt/runtime/rt.jar.java.util.concurrent.js", "/lt/runtime/rt.jar.sun.net.js", "/lt/runtime/rt.jar.sun.security.js", "/lt/runtime/rt.jar.com.sun.js", "/lt/cheerpj/lib/tzdb.dat", "/lt/runtime/rt.jar.sun.nio.fs.js", "/lts/meta-index", "/lts/meta-index.c0.txt", "/lts/rt.jar.c73.txt", "/lts/rt.jar.c74.txt", "/lts/rt.jar.c72.txt", "/lt/runtime/rt.jar.sun.awt.resources.js", "/lt/runtime/rt.jar.java.io.js", "/lt/runtime/rt.jar.java.util.js", "/lt/runtime/rt.jar.java.awt.im.js", "/lt/runtime/rt.jar.javax.js", "/lt/runtime/rt.jar.java.util.spi.js", "/lt/runtime/rt.jar.sun.misc.js", "/lt/runtime/rt.jar.java.net.js", "/lts/rt.jar.c71.txt", "/lts/rt.jar.c70.txt", "/lts/rt.jar.c23.txt", "/lts/rt.jar.c24.txt", "/lts/rt.jar.c22.txt", "/lt/runtime/rt.jar.java.js", "/lt/runtime/rt.jar.java.util.regex.js", "/lts/rt.jar.c2.txt", "/lts/rt.jar.c25.txt", "/lt/runtime/rt.jar.java.awt.font.js", "/lt/runtime/rt.jar.java.text.js", "/lt/runtime/rt.jar.sun.awt.geom.js", "/lt/runtime/rt.jar.sun.util.locale.js", "/lt/cheerpj/lib/ext/localedata.jar", "/lt/runtime/rt.jar.sun.util.js", "/lt/runtime/rt.jar.sun.text.js", "/lt/runtime/rt.jar.sun.awt.util.js", "/lt/runtime/rt.jar.java.util.concurrent.atomic.js", "/lt/cheerpj/lib/currency.data", "/lt/cheerpj/lib/currency.properties", "/lts/rt.jar.c17.txt", "/lts/rt.jar.c18.txt", "/lts/rt.jar.c16.txt", "/lts/rt.jar.c15.txt", "/lt/cheerpj/lib/accessibility.properties", "/lt/runtime/rt.jar.java.lang.invoke.js", "/lts/rt.jar.c26.txt", "/lts/rt.jar.c69.txt", "/lts/rt.jar.c27.txt", "/lts/rt.jar.c28.txt", "/lts/rt.jar.c66.txt", "/lts/rt.jar.c67.txt", "/lts/rt.jar.c65.txt", "/lts/rt.jar.c68.txt", "/lt/runtime/rt.jar.javax.swing.js", "/lt/runtime/rt.jar.java.awt.js", "/lt/runtime/rt.jar.sun.awt.image.js", "/lt/runtime/rt.jar.java.awt.image.js", "/lt/runtime/rt.jar.sun.awt.js", "/lt/runtime/rt.jar.sun.js", "/lt/runtime/rt.jar.java.util.function.js", "/lt/runtime/rt.jar.jdk.internal.org.js", "/lt/runtime/rt.jar.jdk.js", "/lt/runtime/rt.jar.java.security.js", "/lt/runtime/rt.jar.com.js", "/lt/runtime/rt.jar.java.util.concurrent.locks.js", "/lt/runtime/rt.jar.java.beans.js", "/lt/cheerpj/lib/content-types.properties", "/lt/runtime/rt.jar.sun.awt.datatransfer.js", "/lt/runtime/rt.jar.sun.java2d.js", "/lt/runtime/rt.jar.sun.font.js", "/lt/runtime/rt.jar.com.sun.beans.js", "/lt/runtime/rt.jar.java.awt.datatransfer.js", "/lt/runtime/rt.jar.java.util.logging.js", "/lt/runtime/rt.jar.java.awt.geom.js", "/lt/cheerpj/lib/security/java.policy", "/lt/runtime/rt.jar.java.awt.event.js", "/lt/runtime/rt.jar.sun.java2d.pipe.js", "/lt/runtime/rt.jar.sun.awt.dnd.js", "/lt/runtime/rt.jar.javax.swing.event.js", "/lt/runtime/rt.jar.sun.swing.js", "/lt/cheerpj/lib/swing.properties", "/lt/runtime/rt.jar.javax.swing.plaf.metal.js", "/lt/runtime/rt.jar.javax.swing.plaf.basic.js", "/lt/runtime/rt.jar.javax.swing.plaf.js", "/lt/runtime/rt.jar.javax.swing.border.js", "/lt/runtime/rt.jar.com.sun.swing.js", "/lt/runtime/rt.jar.com.sun.java.js", "/lt/runtime/rt.jar.java.util.stream.js", "/lt/runtime/rt.jar.sun.nio.ch.js", "/lt/runtime/rt.jar.sun.java2d.loops.js", "/lt/runtime/rt.jar.java.awt.color.js", "/lts/rt.jar.c12.txt", "/lt/cheerpj/lib/fonts/LucidaSansRegular.ttf", "/lts/rt.jar.c7.txt", "/lts/rt.jar.c8.txt", "/lts/rt.jar.c6.txt", "/lt/cheerpj/lib/fonts/badfonts.txt", "/lt/cheerpj/lib/fonts/index.list", "/lt/cheerpj/lib/fonts/fallback", "/lt/cheerpj/fontconfig.properties", "/lt/runtime/rt.jar.sun.awt.event.js", "/lts/rt.jar.c14.txt", "/lts/rt.jar.c13.txt", "/lt/runtime/rt.jar.sun.awt.im.js"];
	cheerpjInit({preloadResources: preloadResources}).then(cheerpJReady);
	cheerpjCreateDisplay(640, 480, document.getElementById("display"));
}

export default CheerpJIntegration;
