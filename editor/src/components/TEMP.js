let packageName = "cheerpJPackage";
let overwriteSimulatorObject = {
	className: "SimulatorOverwrite",
	code: `package ${packageName};

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;

import cnss.simulator.*;

public class SimulatorOverwrite {
	public static void main(String[] args) {
		Simulator.main(args);
		/*
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		PrintStream ps = new PrintStream(baos);
		PrintStream stdout = System.out;
		System.setOut(ps);
		Simulator.main(args);
		System.out.flush();
		System.setOut(stdout);
		System.out.println(baos.toString());
		*/
	}
}`
};

System.out.println(java.util.Arrays.asList(new java.io.File("/files").list()));

removeStringFile
