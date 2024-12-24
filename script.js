document.getElementById('resultForm').addEventListener('submit', async function (event) {
    event.preventDefault();
  
    const selectedClass = document.getElementById('class').value;
    const selectedStream = document.getElementById('stream').value;
    const name = document.getElementById('name').value;
    const roll = document.getElementById('roll').value;
  
    // Fetch result from backend
    const response = await fetch('/get-result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ class: selectedClass, stream: selectedStream, name, roll }),
    });
    const result = await response.json();
  
    if (result.success) {
      const marksTable = document.getElementById('marksTable');
      marksTable.innerHTML = '';
  
      result.marks.forEach((subject) => {
        const row = document.createElement('tr');
        row.innerHTML = <td>${subject.name}</td><td>${subject.marks}</td>;
        marksTable.appendChild(row);
      });
  
      document.getElementById('result').classList.remove('hidden');
  
      // Download Marksheet Logic
      document.getElementById('downloadButton').onclick = function () {
        const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = marksheet_${roll}.json;
        link.click();
      };
    } else {
      alert(result.message || 'Result not found!');
    }
  });
