const cellCode = {
	DEFAULT_NODE: `import java.util.Arrays;
import cnss.simulator.*;
import cnss.lib.*;

public class MinimalNode extends AbstractApplicationAlgorithm {
	public MinimalNode() {
		super(true, "minimal-node");
	}
	
	public int initialise(int now, int node_id, Node self, String[] args) {
		super.initialise(now, node_id, self, args);
	
		super.log( now, "args: " + Arrays.asList(args));
	return 0;
	}
}`,
	DEFAULT_CONFIG: `node 0 0 cnss.lib.EndSystemControl MinimalNode arg1 arg2 
node 1 0 cnss.lib.EndSystemControl MinimalNode arg3 arg4`,
	PERIODIC_NODE: `import java.util.Arrays;
import cnss.simulator.*;
import cnss.lib.*;

public class PeriodicActionNode extends AbstractApplicationAlgorithm {

	public PeriodicActionNode() {
		super(true, "periodic-node");
	}

	public int initialise(int now, int node_id, Node self, String[] args) {
		super.initialise(now, node_id, self, args);
		return 1500;
	}

	public void on_clock_tick(int now) {
		super.log( now, "on_clock_tick");      
	}

}`,
	DEFAULT_MARKDOWN: `# Markdown Cell`
}

export default cellCode;