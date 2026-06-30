document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactSuccess');
  const staffForm = document.getElementById('staffForm');
  const staffList = document.getElementById('staffList');
  const staffRecordsKey = 'mik_staff_records';

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      contactSuccess.textContent = 'Thank you! Your message has been received. We will contact you soon.';
      contactForm.reset();
    });
  }

  const loadStaffRecords = () => {
    const stored = window.localStorage.getItem(staffRecordsKey);
    return stored ? JSON.parse(stored) : [];
  };

  const saveStaffRecords = (records) => {
    window.localStorage.setItem(staffRecordsKey, JSON.stringify(records));
  };

  const renderStaffList = () => {
    const records = loadStaffRecords();
    staffList.innerHTML = '';
    if (!records.length) {
      staffList.innerHTML = '<p>No staff records available. Add staff to display here.</p>';
      return;
    }

    records.forEach((record, index) => {
      const card = document.createElement('div');
      card.className = 'staff-card';
      card.innerHTML = `
        <h4>${record.fullName}</h4>
        <p><strong>Phone:</strong> ${record.phone}</p>
        <p><strong>Position:</strong> ${record.position}</p>
        <p><strong>Date Joined:</strong> ${record.dateJoined}</p>
        <p><strong>Status:</strong> ${record.status}</p>
      `;
      staffList.appendChild(card);
    });
  };

  if (staffForm) {
    staffForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const staffName = document.getElementById('staffName').value.trim();
      const staffPhone = document.getElementById('staffPhone').value.trim();
      const staffPosition = document.getElementById('staffPosition').value.trim();
      const staffDate = document.getElementById('staffDate').value;
      const staffStatus = document.getElementById('staffStatus').value;

      if (!staffName || !staffPhone || !staffPosition || !staffDate || !staffStatus) {
        return;
      }

      const records = loadStaffRecords();
      records.push({
        id: Date.now(),
        fullName: staffName,
        phone: staffPhone,
        position: staffPosition,
        dateJoined: staffDate,
        status: staffStatus,
      });
      saveStaffRecords(records);
      renderStaffList();
      staffForm.reset();
    });
  }

  if (staffList) {
    renderStaffList();
  }
});
