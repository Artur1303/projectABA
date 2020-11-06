from django.shortcuts import render
from django.views.generic import DetailView, ListView
from webapp.models import Child, TestResult, Test


class IndexView(ListView):
    template_name = 'index.html'
    context_object_name = 'child'
    paginate_by = 5
    paginate_orphans = 0
    model = Child

#    def get_queryset(self):
    #    data = super().get_queryset()
    #    if not self.request.GET.get('is_admin', None):
    #    data = data.filter(status='moderated')
    #    return data

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context

class ChildDetailView(DetailView):
    template_name = 'child/child_view.html'
    model = Child


class ChildTestsView(ListView):
    template_name = 'child/child_tests.html'
    model = Test
    ordering = ['-edited_date']
    paginate_by = 5
    paginate_orphans = 0

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        test = Test.objects.filter(child_id=self.kwargs.get('pk'))
        context['Test'] = test
        context['child_pk'] = self.kwargs.get('pk')
        return context
