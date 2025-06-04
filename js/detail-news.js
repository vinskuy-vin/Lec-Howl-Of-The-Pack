
$(document).ready(function() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');

  $.getJSON('./data/blog.json', function(data) {
    const article = data.find(item => item.slug === slug);

    if (article) {
      $('.article-title').text(article.title);
      $('.featured-image').attr('src', article.image).attr('alt', article.alt);
      $('.author-name').text(article.author);
      $('.article-date').text(article.date);
      $('.article-body').html(article.content);
    } else {
      $('.article-content-wrapper').html('<p>Artikel tidak ditemukan.</p>');
    }

    $('.related-articles-grid').empty();
    const related = data.filter(item => item.slug !== slug).slice(0, 3);
        related.forEach(item => {
            $('.related-articles-grid').append(`
                <div class="related-article-card">
                    <img src="${item.image}" alt="${item.alt}">
                    <div class="related-card-content">
                        <h3>${item.title}</h3>
                        <span class="related-article-meta">Oleh ${item.author} • 5 menit baca</span>
                        <a href="detail-news.html?slug=${item.slug}" class="read-more-link">READ MORE</a>
                    </div>
                </div>
            `);
        });
    });
});
