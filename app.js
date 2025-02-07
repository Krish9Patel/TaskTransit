// Dark and Light Theme Toggle
function toggleTheme() {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', document.body.dataset.theme);
  }
  
  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) document.body.dataset.theme = savedTheme;
  
  // Set dynamic BASE_URL based on environment
  // (For frontend bundlers like webpack, process.env.NODE_ENV is injected;
  //  if not, you can use window.location.hostname as a fallback.)
  const BASE_URL = (typeof process !== 'undefined' && process.env.NODE_ENV === 'production')
    ? 'https://task-flow.fly.dev' 
    : 'http://localhost:8080';
  
  // D3 Chart setup
  let tasks = [];
  const svg = d3.select("svg");
  const margin = { top: 20, right: 20, bottom: 30, left: 100 };
  const width = svg.node().getBoundingClientRect().width - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
  
  // Modal elements
  const infoModal = document.getElementById("infoModal");
  const editModal = document.getElementById("editModal");
  
  // Fetch tasks from backend API
  async function fetchTasks() {
    try {
      const response = await fetch(`${BASE_URL}/api/tasks`);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      tasks = await response.json();
      // Convert date strings to Date objects
      tasks.forEach(task => {
        task.start = new Date(task.start);
        task.end = new Date(task.end);
      });
      updateChart();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to load tasks');
    }
  }
  
  fetchTasks();
  
  // Close modal buttons
  const closeButtons = document.querySelectorAll(".close");
  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      infoModal.style.display = "none";
      editModal.style.display = "none";
    });
  });
  
  // Close modals when clicking outside
  window.addEventListener("click", event => {
    if (event.target === infoModal) infoModal.style.display = "none";
    if (event.target === editModal) editModal.style.display = "none";
  });
  
  // Update the D3 chart with tasks
  function updateChart() {
    g.selectAll("*").remove();
    if (tasks.length === 0) return;
  
    const x = d3.scaleTime()
      .domain([d3.min(tasks, d => d.start), d3.max(tasks, d => d.end)])
      .range([0, width]);
  
    const y = d3.scaleBand()
      .domain(tasks.map(d => d.name))
      .range([0, height])
      .padding(0.2);
  
    // Create bars for tasks
    g.selectAll(".bar")
      .data(tasks)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.start))
      .attr("y", d => y(d.name))
      .attr("width", d => x(d.end) - x(d.start))
      .attr("height", y.bandwidth())
      .on("click", (event, d) => showTaskInfo(d));
  
    // Create y-axis
    const yAxis = g.append("g").call(d3.axisLeft(y));
    yAxis.selectAll(".tick text")
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        const task = tasks.find(task => task.name === d);
        if (task) showEditForm(task);
      });
  
    g.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));
  }
  
  // Function to show task information in a modal
  function showTaskInfo(task) {
    document.getElementById("infoTitle").textContent = task.name;
    document.getElementById("infoDescription").textContent = task.description;
    infoModal.style.display = "flex";
  }
  
  // Global variable to track the current task's ID for editing
  let currentTaskId = null;
  
  // Function to show the edit form modal pre-filled with task data
  function showEditForm(task) {
    currentTaskId = task._id; // Using the MongoDB _id
    document.getElementById("editTaskName").value = task.name;
    document.getElementById("editTaskDescription").value = task.description;
    document.getElementById("editStartDate").value = task.start.toISOString().split('T')[0];
    document.getElementById("editEndDate").value = task.end.toISOString().split('T')[0];
    editModal.style.display = "flex";
  }
  
  // Submit handler for creating a new task
  document.getElementById("taskForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const taskData = {
      name: document.getElementById("taskName").value,
      start: document.getElementById("startDate").value,
      end: document.getElementById("endDate").value,
      description: document.getElementById("taskDescription").value
    };
  
    try {
      const response = await fetch(`${BASE_URL}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
      if (!response.ok) throw new Error('Failed to create task');
      await fetchTasks();
      event.target.reset();
    } catch (error) {
      alert(error.message);
    }
  });
  
  // Submit handler for editing a task
  document.getElementById("editForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const updatedTask = {
      name: document.getElementById("editTaskName").value,
      description: document.getElementById("editTaskDescription").value,
      start: document.getElementById("editStartDate").value,
      end: document.getElementById("editEndDate").value
    };
  
    try {
      const response = await fetch(`${BASE_URL}/api/tasks/${currentTaskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update task');
      }
      await fetchTasks();
      editModal.style.display = "none";
    } catch (error) {
      alert(error.message);
    }
  });
  
  // Handler for deleting a task from the edit modal
  document.getElementById("deleteTask").addEventListener("click", async function() {
    if (!currentTaskId) return;
    try {
      const response = await fetch(`${BASE_URL}/api/tasks/${currentTaskId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete task');
      }
      await fetchTasks();
      editModal.style.display = "none";
    } catch (error) {
      alert(error.message);
    }
  });
  