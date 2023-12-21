import logo from '../assets/logo.png';

export default function Header() {
  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light mb-4 p-0">
      <div className="container">
        <a className="navbar-brand" href="/">
          <div className="d-flex align-items-center">
            <img src={logo} alt="logo" className="logo me-2" />
            <div>Project Management</div>
          </div>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/projects">
                Projects
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/clients">
                Clients
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
