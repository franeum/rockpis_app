#include "./m_pd.h"

/* ------------------------- cyclewrite~ -------------------------- */

static t_class *cyclewrite_tilde_class;

typedef struct _cyclewrite_tilde
{
    t_object x_obj;
    int x_phase;
    int x_nsampsintab;
    int x_flag_rec;
    t_word *x_vec;
    t_symbol *x_arrayname;
    t_float x_f;
} t_cyclewrite_tilde;

void cyclewrite_tilde_tick(t_cyclewrite_tilde *x);

void *cyclewrite_tilde_new(t_symbol *s)
{
    t_cyclewrite_tilde *x = (t_cyclewrite_tilde *)pd_new(cyclewrite_tilde_class);
    x->x_phase = 0x7fffffff;
    x->x_arrayname = s;
    x->x_f = 0;
    inlet_new(&x->x_obj, &x->x_obj.ob_pd, &s_signal, &s_signal);
    return (x);
}

void cyclewrite_tilde_redraw(t_cyclewrite_tilde *x)
{
    t_garray *a = (t_garray *)pd_findbyclass(x->x_arrayname, garray_class);
    if (!a)
        bug("cyclewrite_tilde_redraw");
    else garray_redraw(a);
}

t_int *cyclewrite_tilde_perform(t_int *w)
{
    t_cyclewrite_tilde *x = (t_cyclewrite_tilde *)(w[1]);
    t_sample *in = (t_sample *)(w[2]);
    t_sample *in2 = (t_sample *)(w[3]);
    int n = (int)(w[4]), phase = x->x_phase, endphase = x->x_nsampsintab;
    if (!x->x_vec) goto bad;
    int flag = x->x_flag_rec;

    if (flag == 1)
        if (endphase > phase) {

            int nxfer = endphase - phase;
            t_word *wp = x->x_vec + phase;
            if (nxfer > n) nxfer = n;
            phase += nxfer;
            while (nxfer--)
            {
                t_sample f = *in++;
                if (PD_BIGORSMALL(f))
                    f = 0;
                (wp++)->w_float = f;
            }
            if (phase >= endphase)
            {
                cyclewrite_tilde_redraw(x);
                //phase = 0x7fffffff;
                phase = 0.0;
            }
            x->x_phase = phase;

        } else x->x_phase = 0x7fffffff;

bad:
    return (w+5);
}

void cyclewrite_tilde_float(t_cyclewrite_tilde *x, t_float f) {
    x->x_flag_rec = f > 0 ? 1 : 0;
    if (x->x_flag_rec == 1)
        poststring("recording");
    else poststring("STOP recording");
}

void cyclewrite_tilde_set(t_cyclewrite_tilde *x, t_symbol *s)
{
    t_garray *a;

    x->x_arrayname = s;
    if (!(a = (t_garray *)pd_findbyclass(x->x_arrayname, garray_class)))
    {
        if (*s->s_name) pd_error(x, "cyclewrite~: %s: no such array",
            x->x_arrayname->s_name);
        x->x_vec = 0;
    }
    else if (!garray_getfloatwords(a, &x->x_nsampsintab, &x->x_vec))
    {
        pd_error(x, "%s: bad template for cyclewrite~", x->x_arrayname->s_name);
        x->x_vec = 0;
    }
    else garray_usedindsp(a);
}

void cyclewrite_tilde_dsp(t_cyclewrite_tilde *x, t_signal **sp)
{
    cyclewrite_tilde_set(x, x->x_arrayname);
    dsp_add(cyclewrite_tilde_perform, 4, x, sp[0]->s_vec, sp[1]->s_vec, sp[0]->s_n);
}

void cyclewrite_tilde_bang(t_cyclewrite_tilde *x)
{
    x->x_phase = 0;
}

void cyclewrite_tilde_start(t_cyclewrite_tilde *x, t_floatarg f)
{
    x->x_phase = (f > 0 ? f : 0);
}

void cyclewrite_tilde_stop(t_cyclewrite_tilde *x)
{
    if (x->x_phase != 0x7fffffff)
    {
        cyclewrite_tilde_redraw(x);
        x->x_phase = 0x7fffffff;
    }
}

void cyclewrite_tilde_setup(void)
{
    cyclewrite_tilde_class = class_new(gensym("cyclewrite~"),
        (t_newmethod)cyclewrite_tilde_new, 0,
        sizeof(t_cyclewrite_tilde), 0, A_DEFSYM, 0);
    CLASS_MAINSIGNALIN(cyclewrite_tilde_class, t_cyclewrite_tilde, x_f);
    class_addmethod(cyclewrite_tilde_class, (t_method)cyclewrite_tilde_dsp,
        gensym("dsp"), A_CANT, 0);
    class_addmethod(cyclewrite_tilde_class, (t_method)cyclewrite_tilde_set,
        gensym("set"), A_SYMBOL, 0);
    class_addmethod(cyclewrite_tilde_class, (t_method)cyclewrite_tilde_stop,
        gensym("stop"), 0);
    class_addmethod(cyclewrite_tilde_class, (t_method)cyclewrite_tilde_start,
        gensym("start"), A_DEFFLOAT, 0);
    class_addbang(cyclewrite_tilde_class, cyclewrite_tilde_bang);
}