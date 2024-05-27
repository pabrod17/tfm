package com.example.tfmmobile.ui.home

import android.content.Intent
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.FrameLayout
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.navigation.NavController
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.setupWithNavController
import com.example.tfmmobile.R
import com.example.tfmmobile.TfmMobileApp.Companion.prefs
import com.example.tfmmobile.databinding.ActivityMainBinding
import com.example.tfmmobile.ui.login.LoginActivity
import com.example.tfmmobile.ui.signup.SignUpActivity
import com.example.tfmmobile.ui.users.ProfileActivity
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var navController: NavController


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        //Esta linea es para  ver a pantalla completa la app. Pero asi me como el notch
        enableEdgeToEdge()

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val toolbar : Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar);
        supportActionBar?.setDisplayShowTitleEnabled(false)
//        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
//            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
//            v.setPadding(
//                systemBars.left,
//                systemBars.top,
//                systemBars.right,
//                systemBars.bottom
//            )
//            insets
//        }
//        val toolbar = findViewById<FrameLayout>(R.id.toolbar)
//        toolbar.measure(View.MeasureSpec.UNSPECIFIED, View.MeasureSpec.UNSPECIFIED)
//        val toolbarHeight = toolbar.measuredHeight
//        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
//            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
//            v.setPadding(
//                systemBars.left,
//                systemBars.top + toolbarHeight, // Agregar la altura de la barra de título al margen superior
//                systemBars.right,
//                systemBars.bottom
//            )
//            insets
//        }
        initUi()
    }
    private fun initUi() {
        initNavigation()
    }

    private fun initNavigation(){
        val navHost = supportFragmentManager.findFragmentById(R.id.fragmentContainerView) as NavHostFragment
        navController = navHost.navController
        binding.bottomNavView.setupWithNavController(navController)
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.toolbar_menu, menu)
        return super.onCreateOptionsMenu(menu)
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        if(item.itemId == R.id.logout) {
            prefs.removeAuthToken()
            prefs.removeUserId()
            prefs.removeLoginState()

            prefs.removeUserName()
            prefs.removeUserFirstName()
            prefs.removeUserSurnames()
            prefs.removeUserEmail()
            prefs.removeUserPassword()

            val intent = Intent(this, LoginActivity::class.java)
            this.startActivity(intent)
        }
        if(item.itemId == R.id.profile) {
            val intent = Intent(this, ProfileActivity::class.java)
            this.startActivity(intent)
        }
        if(item.itemId == R.id.change_password) {
            val intent = Intent(this, LoginActivity::class.java)
            this.startActivity(intent)
        }
        return super.onOptionsItemSelected(item)
    }

}

//        Nuestra activity principal sera esta:
//            - Tendra toolbar, bottombar. Y todo el contenido de dentro seran los fragments
//        En la bottombar tendremos 5 opciones>
//            - Club
//            - Eventos
//            - Bienestar
//            - Jugadas
//            - Calendario
//          En la toolbar tendremos 3 puntos y saldran 2 opciones:
//                  - Profile
//                        - Actualizar datos (Mirar como se actualiza la password (Si es factible. Metemos otra opcion en la toolbar))
//                  - Logout
//        Luego quedara la pantalla de login y signup
//****************************************************************************************************************************
//        Esto de abajo es la forma normal de cargar el xml. Pero lo haremos con el binding
//        setContentView(R.layout.activity_main)
//        val tv = findViewById<TextView>(R.id.example)

//        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
//            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
//            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
//            insets
//        }