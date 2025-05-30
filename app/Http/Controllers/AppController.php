<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AppController extends Controller
{
    public function index() {
        return Inertia::render('LandingPage');
    }

    public function login() {
        return Inertia::render('LoginPage');
    }

    public function dashboard_kasir() {
        return Inertia::render('Dashboard-Kasir');
    }

    public function dashboard_admin() {
        return Inertia::render('Dashboard-Admin');
    }
    public function report_admin() {
        return Inertia::render('Report-Admin');
    }

}
