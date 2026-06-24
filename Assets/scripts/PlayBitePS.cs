using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayBitePS : MonoBehaviour
{
    public ParticleSystem Bite;

    // Start is called before the first frame update
    void Start()
    {
        Bite.Play();
    }

   
}
