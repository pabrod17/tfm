package com.example.tfmmobile.ui.home

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.NavController
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.setupWithNavController
import com.example.tfmmobile.R
import com.example.tfmmobile.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var navController: NavController
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        //        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
//            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
//            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
//            insets
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
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