<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-dark-subtle">
        <RouterLink class="navbar-brand" to="/">Customer Information Management</RouterLink>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <RouterLink class="nav-link" to="/">Home </RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link" to="/customers">Customers</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link" to="/profile">My Profile</RouterLink>
                </li>
            </ul>
        </div>
    </nav>
</template>
